# 🗣️ Realtime Caption

> 🎙️ 一款基于 [SenseVoice](https://github.com/FunAudioLLM/SenseVoice) 的本地实时字幕系统，支持系统音频捕获、语音识别与字幕浮窗显示，适用于会议记录、实时翻译、直播字幕等场景。

## 🔧 项目简介

**Realtime Caption** 是一个运行于 Windows 平台的本地实时字幕工具，支持从系统音频中实时提取语音内容，通过大模型进行自动语音识别（ASR），并将字幕以悬浮窗形式实时呈现。适用于想要本地部署、安全私有化使用实时语音识别的用户。

本项目基于开源语音模型 **SenseVoice**，结合 Python 后端和 Electron 前端构建完整工作流，无需依赖云服务。

---

## ✨ 功能亮点

* ✅ **系统音频捕获**：基于 WASAPI Loopback 捕捉系统播放的声音，无需麦克风输入。
* 🧠 **语音识别模型**：集成 SenseVoice 本地大模型，无需联网即可识别普通话。
* 🌐 **WebSocket 通讯**：后端采用 WebSocket 协议实现实时音频传输与识别结果回传。
* 🪟 **字幕悬浮窗**：Electron 实现简洁字幕窗口，适配不同桌面场景。
* 🔒 **本地运行**：全流程本地执行，无需上传任何音频，保障数据隐私。

---

## 📁 项目结构

```
Realtime-Caption/
├── api4sensevoice/     # ASR服务与WebSocket接口（基于FastAPI）
├── python/             # 系统音频捕获模块（WASAPI + Sounddevice）
├── electron/           # Electron前端（字幕显示界面）
├── SenseVoice/         # 模型文件（需预下载）
├── requirements.txt    # Python依赖
└── README.md
```

---

## 🚀 快速开始

1. 克隆项目：

```bash
git clone https://github.com/orangeburn/Realtime-Caption.git
cd Realtime-Caption
```

2. 安装 Python 依赖：

```bash
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

3. 安装 Node.js 依赖（用于 Electron GUI）：

```bash
cd electron
npm install
```

4. 启动后台服务：

```bash
py api4sensevoice/server_wss.py
```

5. 启动音频捕获模块：

```bash
py python/audio_capture_websocket.py
```

6. 启动前端字幕窗口：

```bash
cd electron
npm start
```

---

## 🧩 依赖要求

* Windows 10/11 系统
* Python 3.10+
* Node.js 14+
* NVIDIA GPU（推荐用于模型推理）
* 安装 [VC++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)（若未安装）

---

## 🙏 鸣谢

* [SenseVoice (by 阿里达摩院)](https://github.com/FunAudioLLM/SenseVoice) — 自动语音识别核心模型
* [api4sensevoice](https://github.com/0x5446/api4sensevoice) — 基于 SenseVoice 的轻量化服务实现

---

## 📜 许可证

<<<<<<< HEAD
本项目采用 [MIT License](./LICENSE) 开源。
=======
本项目采用 [MIT License](./LICENSE) 开源。
>>>>>>> 94be3ff (chore: 补交所有变更，准备 rebase/push)
