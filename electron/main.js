const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getOllamaModels } = require('./ollamaApi');
const { spawn } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 100,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

ipcMain.handle('get-ollama-models', async () => {
  try {
    const models = await getOllamaModels();
    return { success: true, models };
  } catch (e) {
    return { success: false, error: e };
  }
});

function startOllamaServe() {
  // 检查是否已启动，可用 netstat 或直接尝试启动（Ollama 已启动会自动忽略重复 serve）
  const ollamaProcess = spawn('ollama', ['serve'], {
    detached: true,
    stdio: 'ignore', // 不占用主进程输出
    shell: true
  });
  ollamaProcess.unref();
}

app.whenReady().then(() => {
  startOllamaServe();
  createWindow();
});
