// ✅ 简化后的 renderer.js，仅保留后端 WebSocket 翻译集成版本
let finalSubtitle = '';
let lastFinalSubtitle = '';

window.addEventListener('DOMContentLoaded', () => {
  const tgtLangSelect = document.getElementById('tgtLang');
  // 语言选项映射（主流+东南亚，部分示例，可扩展）
  const langOptions = [
    { value: 'zho_Hans', label: '中文' },        // 中文（简体）
    { value: 'eng_Latn', label: 'English' },    // 英语
    { value: 'jpn_Jpan', label: '日本語' },      // 日语
    { value: 'kor_Hang', label: '한국어' },      // 韩语
    { value: 'vie_Latn', label: 'Tiếng Việt' }, // 越南语
    { value: 'tha_Thai', label: 'ไทย' },        // 泰语
    { value: 'ind_Latn', label: 'Bahasa Indonesia' }, // 印度尼西亚语
    { value: 'msa_Latn', label: 'Bahasa Melayu' },    // 马来语
    { value: 'fil_Latn', label: 'Filipino' },         // 菲律宾语
    { value: 'khm_Khmr', label: 'ភាសាខ្មែរ' },        // 高棉语（柬埔寨）
    { value: 'bur_Mymr', label: 'မြန်မာ' },           // 缅甸语
    { value: 'tam_Taml', label: 'தமிழ்' },            // 泰米尔语
    { value: 'tur_Latn', label: 'Türkçe' },           // 土耳其语
    { value: 'deu_Latn', label: 'Deutsch' },          // 德语
    { value: 'fra_Latn', label: 'Français' },         // 法语
    { value: 'spa_Latn', label: 'Español' },          // 西班牙语
    { value: 'rus_Cyrl', label: 'Русский' },          // 俄语
    { value: 'ara_Arab', label: 'العربية' },          // 阿拉伯语
    // ...可根据 NLLB-200 继续扩展
  ];

  // 自动生成下拉选项
  if (tgtLangSelect) {
    tgtLangSelect.innerHTML = '';
    langOptions.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.label;
      tgtLangSelect.appendChild(option);
    });
    tgtLangSelect.value = 'zho_Hans'; // 默认中文
  }

  const subtitleEl = document.getElementById('subtitle');
  const translationEl = document.getElementById('translation');
  const btnOriginal = document.getElementById('btn-original');
  const btnTranslated = document.getElementById('btn-translated');
  const btnBoth = document.getElementById('btn-both');

  // 实时字幕显示（info）
  if (window.electronAPI && window.electronAPI.onSubtitle) {
    window.electronAPI.onSubtitle((text) => {
      if (subtitleEl) {
        subtitleEl.innerText = text || '';
      }
    });
  }

  // 最终字幕 + 翻译字幕显示（data + translated）
  if (window.electronAPI && window.electronAPI.onFinalResult) {
    window.electronAPI.onFinalResult((payload) => {
      console.log('Received payload:', payload); // 添加日志
      let data = '', translated = '';
      if (typeof payload === 'string') {
        translated = payload;
      } else if (payload && typeof payload === 'object') {
        data = payload.data || '';
        translated = payload.translated || '';
      }

      console.log('Data:', data); // 打印最终字幕内容
      console.log('Translated:', translated); // 打印翻译字幕
      console.log('Final payload received:', payload); // 打印完整的 payload
      console.log('Translated field:', translated); // 打印翻译字段的值

      // 更新最终字幕（优先 data 字段）
      if (subtitleEl && typeof data === 'string') {
        if (data && data.trim() !== '') {
          subtitleEl.innerText = data;
          lastFinalSubtitle = data;
        } else if (lastFinalSubtitle) {
          // 保持上一次字幕
          subtitleEl.innerText = lastFinalSubtitle;
        } else {
          subtitleEl.innerText = '原声字幕……';
        }
      }

      // 更新翻译字幕
      if (translationEl) {
        // 过滤翻译前缀（如“zho_Hans ”、“eng_Latn ”等）
        if (typeof translated === 'string') {
          translated = translated.replace(/^(zho_Hans|eng_Latn|jpn_Jpan|kor_Hang|vie_Latn|tha_Thai|ind_Latn|msa_Latn|fil_Latn|khm_Khmr|bur_Mymr|tam_Taml|tur_Latn|deu_Latn|fra_Latn|spa_Latn|rus_Cyrl|ara_Arab)\s+/i, '');
        }
        if (typeof translated === 'string' && translated.trim() !== '') {
          translationEl.style.display = '';
          translationEl.style.visibility = 'visible';
          translationEl.style.opacity = '1';
          translationEl.innerText = translated;
        } else {
          translationEl.innerText = '翻译字幕……';
        }
        // 强制刷新 DOM
        translationEl.offsetHeight; // 触发重绘
      }
    });
  }

  // 默认显示双语字幕
  const setLangMode = (mode) => {
    if (mode === 'zh') {
      if (subtitleEl) subtitleEl.style.display = '';
      if (translationEl) translationEl.style.display = 'none';
    } else if (mode === 'en') {
      if (subtitleEl) subtitleEl.style.display = 'none';
      if (translationEl) translationEl.style.display = '';
    } else {
      if (subtitleEl) subtitleEl.style.display = '';
      if (translationEl) translationEl.style.display = '';
    }
  };
  setLangMode('both');

  // 按钮点击事件
  if (btnOriginal) {
    btnOriginal.addEventListener('click', () => setLangMode('zh'));
  }

  if (btnTranslated) {
    btnTranslated.addEventListener('click', () => setLangMode('en'));
  }

  if (btnBoth) {
    btnBoth.addEventListener('click', () => setLangMode('both'));
  }

  // 状态指示灯（保留）
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  if (window.electronAPI && window.electronAPI.getConnectionStatus) {
    setInterval(() => {
      const ready = window.electronAPI.getConnectionStatus();
      if (ready === 1) {
        if (statusDot) statusDot.classList.add('connected');
        if (statusText) statusText.innerText = '实时字幕';
      } else {
        if (statusDot) statusDot.classList.remove('connected');
        if (statusText) statusText.innerText = '连接中...';
      }
    }, 1000);
  }

  // 监听翻译目标语言切换
  if (tgtLangSelect) {
    tgtLangSelect.addEventListener('change', (e) => {
      let val = tgtLangSelect.value;
      // 直接用 value 作为 target_lang
      let target_lang = val;
      if (window.electronAPI && window.electronAPI.setTargetLang) {
        window.electronAPI.setTargetLang(target_lang);
      } else if (window.electronAPI && window.electronAPI.setASRSourceLang) {
        window.electronAPI.setASRSourceLang(target_lang);
      }
      console.log('[renderer] 切换翻译目标语言:', target_lang);
    });
  }
});

// Add global error handler to capture dragEvent errors
window.addEventListener('error', (event) => {
  console.error('Global error captured:', event.message);
});

// Prevent default drag-and-drop behavior
window.addEventListener('dragover', (event) => {
  event.preventDefault();
});
window.addEventListener('drop', (event) => {
  event.preventDefault();
});
