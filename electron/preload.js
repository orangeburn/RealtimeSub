const { contextBridge } = require('electron');

const socket = new WebSocket("ws://127.0.0.1:27000/ws/subscribe");

const subtitleCallbacks = [];

socket.onopen = () => {
  console.log("✅ [preload] Connected to ASR WebSocket");
};

socket.onerror = (error) => {
  console.error("❌ [preload] WebSocket error:", error);
};

socket.onclose = (event) => {
  console.log("🔌 [preload] WebSocket closed:", event.code, event.reason);
};

socket.onmessage = (event) => {
  try {
    console.log("📨 [preload] Received message:", event.data);
    const message = JSON.parse(event.data);
    if (message.code === 0 && message.data) {
      const text = message.data.trim();
      subtitleCallbacks.forEach(cb => cb(text));
    }
  } catch (e) {
    console.warn("⚠️ [preload] 无法解析消息:", event.data, e);
  }
};

contextBridge.exposeInMainWorld('electronAPI', {
  onSubtitle: (callback) => {
    subtitleCallbacks.push(callback);
  },
  getConnectionStatus: () => {
    return socket.readyState;
  }
});
