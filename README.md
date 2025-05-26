# Realtime Caption MVP

一个基于SenseVoice ASR模型的实时字幕系统，可以捕获系统音频输出并实时显示字幕。

## 功能特点

- 使用WASAPI Loopback捕获系统音频输出
- 基于WebSocket的实时音频传输
- 集成SenseVoice ASR模型进行语音识别
- Electron实现的字幕浮窗界面
- 支持字幕实时显示和更新

## 系统要求

- Windows 11
- Python 3.10+
- Node.js 14+
- NVIDIA GPU (用于ASR模型推理)

## 安装步骤

1. 克隆仓库
```bash
git clone [your-repo-url]
cd realtime-caption-mvp
```

2. 安装Python依赖
```bash
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

3. 安装Node.js依赖
```bash
cd electron
npm install
```

## 使用方法

1. 启动ASR服务
```bash
py api4sensevoice/server_wss.py
```

2. 启动音频捕获
```bash
py python/audio_capture_websocket.py
```

3. 启动字幕界面
```bash
cd electron
npm start
```

## 项目结构

- `api4sensevoice/`: ASR服务和WebSocket接口
- `python/`: 系统音频捕获模块
- `electron/`: 字幕显示界面
- `SenseVoice/`: ASR模型核心

## 鸣谢

- [SenseVoice](https://github.com/alibaba-damo-academy/SenseVoice)：本项目使用的ASR模型核心，由阿里巴巴达摩院开源
- [api4sensevoice](https://github.com/orangeburn/api4sensevoice)：基于SenseVoice的WebSocket服务实现

## 许可证

MIT License