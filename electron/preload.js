console.log("preload.js loaded");

const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

// 连接订阅接口，只接收字幕推送
const socket = new WebSocket("ws://127.0.0.1:27000/ws/subscribe");

const subtitleCallbacks = [];
const finalResultCallbacks = [];

socket.onopen = () => {
  console.log("✅ [preload] Connected to ASR WebSocket");
  setTimeout(() => {
    try {
      socket.send(JSON.stringify({ type: "ping", ts: Date.now() }));
      console.log("🟢 [preload] Sent ping");
    } catch (e) {
      console.error("❌ [preload] ping send error:", e);
    }
  }, 1000);
};

socket.onerror = (error) => {
  console.error("❌ [preload] WebSocket error:", error);
};

socket.onclose = (event) => {
  console.log("🔌 [preload] WebSocket closed:", event.code, event.reason);
};

socket.onmessage = (event) => {
  try {
    console.log("🔥 [preload] onmessage fired, event:", event);
    console.log("🔄 [preload] Received WebSocket message:", event.data);
    let message;
    try {
      message = JSON.parse(event.data);
    } catch (e) {
      console.warn("⚠️ [preload] 消息 JSON 解析失败:", event.data, e);
      return;
    }
    console.log("✅ [preload] Parsed WebSocket message:", message);
    if (typeof message !== 'object' || message === null || typeof message.code !== 'number') {
      console.warn("⚠️ [preload] 未知格式消息:", event.data);
      return;
    }
    if (message.code === 0 && typeof message.info === 'string') {
      // 实时字幕
      const text = message.info.trim();
      subtitleCallbacks.forEach(cb => cb(text));
    } else if (message.code === 1 && typeof message.translated === 'string') {
      // 翻译字幕，传递完整对象，前端可用 info+translated
      finalResultCallbacks.forEach(cb => cb(message));
    } else {
      // 其它 code 或结构，友好提示
      console.log("ℹ️ [preload] 忽略未处理消息:", message);
    }
  } catch (e) {
    console.error("❌ [preload] onmessage error:", e);
  }
};

// 修正 require 路径，确保 translationManager.js 路径为绝对路径
const translationManager = require(path.join(__dirname, 'translationManager.js'));
contextBridge.exposeInMainWorld('translationManager', translationManager);

contextBridge.exposeInMainWorld('electronAPI', {
  onSubtitle: (callback) => {
    subtitleCallbacks.push(callback);
  },
  onFinalResult: (callback) => {
    finalResultCallbacks.push(callback);
  },
  getConnectionStatus: () => {
    return socket.readyState;
  },
  getOllamaModels: async () => {
    return await ipcRenderer.invoke('get-ollama-models');
  },
  setASRSourceLang: (lang) => {
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify({ type: 'set_lang', lang }));
    }
  },
  setTargetLang: (target_lang) => {
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify({ type: 'set_target_lang', target_lang }));
    }
  }
});
