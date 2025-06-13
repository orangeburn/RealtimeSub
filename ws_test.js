// ws_test.js
const ws = new (require('ws'))('ws://127.0.0.1:27000/ws/transcribe');

ws.on('open', () => {
  console.log('✅ [test] WebSocket connected');
  ws.send(JSON.stringify({ type: 'ping', ts: Date.now() }));
});

ws.on('message', (data) => {
  console.log('🔥 [test] Received message:', data.toString());
  try {
    const msg = JSON.parse(data);
    console.log('✅ [test] Parsed message:', msg);
  } catch (e) {
    console.warn('⚠️ [test] JSON parse error:', e);
  }
});

ws.on('error', (err) => {
  console.error('❌ [test] WebSocket error:', err);
});

ws.on('close', (code, reason) => {
  console.log('🔌 [test] WebSocket closed:', code, reason);
});
