@echo off
setlocal enabledelayedexpansion

echo ===============================================
echo 🧠 Step 1: 启动 ASR WebSocket 服务（server_wss.py）
echo ===============================================
start "ASR Server" cmd /k "cd /d %~dp0api4sensevoice && python server_wss.py"

echo 等待服务端初始化（5 秒）...
timeout /t 5 >nul

echo ===============================================
echo 🎧 Step 2: 启动系统音频采集模块（audio_capture_websocket.py）
echo ===============================================
start "Audio Capture" cmd /k "cd /d %~dp0python && python audio_capture_websocket.py"

echo 等待音频发送稳定（3 秒）...
timeout /t 3 >nul

echo ===============================================
echo 🖥️ Step 3: 启动 Electron 字幕浮窗应用
echo ===============================================
start "Subtitle UI" cmd /k "cd /d %~dp0electron && npm start"

echo.
echo ✅ 所有模块启动完成，请查看各窗口输出以确认运行状态。
