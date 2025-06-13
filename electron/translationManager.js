// translationManager.js
// Ollama 流式翻译管理器

let sourceLang = 'auto'; // 默认源语言
let targetLang = 'zh'; // 默认目标语言
let currentController = null;
let onTranslationCallbacks = [];
let ollamaModel = null; // 默认模型名由前端选择
let sttDataQueue = [];
const MAX_CONTEXT = 3;
let ollamaTemperature = 0.2; // 默认temperature，可由前端设置

function setSourceLang(lang) {
  sourceLang = lang;
}
function setTargetLang(lang) {
  targetLang = lang;
}
function setModel(model) {
  ollamaModel = model;
}
function setTemperature(temp) {
  ollamaTemperature = temp;
}
function onTranslation(callback) {
  onTranslationCallbacks.push(callback);
}

// Ollama 本地流式翻译接口（假设已启动 ollama，模型如 mistral 或 llama3）
// 你可以根据实际模型和 API 调整 prompt
async function streamTranslate(text, srcLang = sourceLang, tgtLang = targetLang) {
  // 只翻译有内容的原声字幕，防止空内容或无关内容被翻译
  if (!text || !tgtLang || !ollamaModel || text.trim() === '' || text === '[翻译服务不可用]' || text === '[翻译服务异常]') return;
  // 维护最近3条data队列
  sttDataQueue.push(text);
  if (sttDataQueue.length > MAX_CONTEXT) sttDataQueue.shift();
  // 构造上下文prompt
  let context = '';
  if (sttDataQueue.length > 1) {
    const ref = sttDataQueue.slice(0, -1).map((t, i) => `参考${i+1}：${t}`).join('\n');
    context = ref + '\n';
  }
  const current = sttDataQueue[sttDataQueue.length - 1];
  const prompt = `${context}你是多语言口译专家，请参考上述内容，将最后一句“${current}”翻译为${tgtLang}”，只输出最后一句的${tgtLang}译文，不要输出参考内容，不要重复原文，不要解释，不要输出思考过程`;

  if (currentController) currentController.abort();
  currentController = new AbortController();
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: ollamaModel,
        prompt,
        stream: true,
        temperature: ollamaTemperature
      }),
      signal: currentController.signal
    });
    if (!response.ok) {
      onTranslationCallbacks.forEach(cb => cb('[翻译服务不可用]'));
      return;
    }
    if (!response.body) return;
    const reader = response.body.getReader();
    let result = '';
    let decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      // Ollama SSE 格式：每行一个 JSON
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.trim()) {
          try {
            const obj = JSON.parse(line);
            if (obj.response) {
              result += obj.response;
              onTranslationCallbacks.forEach(cb => cb(result));
            }
          } catch (e) {}
        }
      }
    }
  } catch (e) {
    onTranslationCallbacks.forEach(cb => cb('[翻译服务异常]'));
  }
}

module.exports = {
  setSourceLang,
  setTargetLang,
  setModel,
  setTemperature,
  onTranslation,
  streamTranslate
};
