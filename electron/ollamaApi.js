// ollamaApi.js
// 提供获取本地 ollama 模型列表的 API
const { exec } = require('child_process');

function getOllamaModels() {
  return new Promise((resolve, reject) => {
    exec('ollama list', (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
        return;
      }
      // ollama list 输出格式: "model_name  ..."
      const models = stdout.split('\n')
        .map(line => line.split(' ')[0].trim())
        .filter(name => name && !name.startsWith('NAME'));
      resolve(models);
    });
  });
}

module.exports = { getOllamaModels };
