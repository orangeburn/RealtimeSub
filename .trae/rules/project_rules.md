当前项目音频采集系统输出音频而不是麦克风。

项目运行流程：

[ 系统音频输出 ]

↓

┌────────────────────────────────┐

│ audio_capture_websocket.py     │   ← 使用 WASAPI Loopback

└────────────────────────────────┘

↓ (WebSocket)

[ ws://localhost:8000/ws/audio ]

↓

┌────────────────────────────────┐

│ server_wss.py (ASR WebSocket)  │ ← 依赖 SenseVoice 模型

└────────────────────────────────┘

↓ (识别结果)

[ JSON: {text, time, confidence} ]

↓

┌────────────────────────────────┐

│ Electron renderer.js           │ ← 通过 WebSocket/IPC 接收数据

└────────────────────────────────┘

↓

[ index.html - 字幕显示浮窗 ]

🔧 架构模块拆解

1. ASR模块： SenseVoice/

功能 ：承载自动语音识别（ASR）模型逻辑

关键组件 ：

model.py ：模型定义（Transformer/Conformer结构）

api.py ：核心模型调用接口

webui.py ：模型推理Web演示界面

utils/ ：音频/文本预处理、评估工具

deepspeed_conf/ ：大规模训练配置（推理时可忽略）

用途 ：开发与验证模型推理功能，供 API 封装调用

2. 语音识别 API 层： api4sensevoice/

功能 ：为前端或客户端提供 WebSocket / HTTP 的语音识别服务

关键文件 ：

server.py ：REST 风格 HTTP 接口（可选）

server_wss.py ：WebSocket 服务端（主用）

model.py ：调用 SenseVoice 模型的封装类

client_wss.html ：用于本地测试 WebSocket 服务

特性 ：

异步接收音频包 → 实时返回字幕结果

可插拔模型（多模型支持/切换）

3. 系统音频采集模块： python/

功能 ：基于 WASAPI loopback 实现音频采集 + WebSocket客户端发送

关键文件 ：

audio_capture_websocket.py ：采集系统音频并实时推送至 ASR WebSocket 服务

websocket_server.py ：独立的 WebSocket Echo 测试服务器

websocket_server_test.py ：调试工具，用于验证 client/server 通信连通性

list_devices.py ：列出音频输入/输出设备，帮助定位系统播放通道

补充说明 ：

运行环境隔离在 python/venv/ 或项目根 venv/ （建议整合为统一虚拟环境）

4. 桌面前端浮窗模块： electron/

功能 ：渲染实时字幕浮窗，监听识别结果，展示给用户

关键文件 ：

main.js ：Electron 主进程，负责窗口控制与进程管理

preload.js ：Node.js 与前端 JS 之间的数据桥梁（IPC 通信）

renderer.js ：接收字幕数据，渲染在页面

index.html ：简洁浮窗 UI，显示识别结果

说明 ：

UI 最小化设计，仅显示字幕结果

预留快捷键隐藏/退出逻辑、字体/透明度调整接口