# 🗣️ Realtime Caption

> 🎙️ 一款基于 [SenseVoice](https://github.com/FunAudioLLM/SenseVoice) 的本地实时字幕系统，支持系统音频捕获、语音识别、实时翻译与字幕浮窗显示，适用于会议记录、实时翻译、直播字幕等场景。

---

## 🆕 更新内容

- 支持接入 nllb200 多语言模型，实现字幕实时翻译。
- 优化依赖管理，项目已排除 venv、node_modules 等依赖目录和大文件，远程仓库仅包含源码和配置。
- 增加大文件本地恢复说明，便于用户快速部署模型。

---

## 🆕 更新内容

- 支持接入 nllb200 多语言模型，实现字幕实时翻译。
- 优化依赖管理，项目已排除 venv、node_modules 等依赖目录和大文件，远程仓库仅包含源码和配置。
- 增加大文件本地恢复说明，便于用户快速部署模型。

---

## 🔧 项目简介

**Realtime Caption** 是一个运行于 Windows 平台的本地实时字幕工具，支持从系统音频中实时提取语音内容，通过大模型进行自动语音识别（ASR），并将字幕以悬浮窗形式实时呈现。适用于想要本地部署、安全私有化使用实时语音识别的用户。

本项目基于开源语音模型 **SenseVoice**，结合 Python 后端和 Electron 前端构建完整工作流，无需依赖云服务。现已支持 nllb200 多语言模型，可实现实时字幕翻译。

---

## ✨ 功能亮点

* ✅ **系统音频捕获**：基于 WASAPI Loopback 捕捉系统播放的声音，无需麦克风输入。
* 🧠 **语音识别模型**：集成 SenseVoice 本地大模型，无需联网即可识别普通话。
* 🌐 **WebSocket 通讯**：后端采用 WebSocket 协议实现实时音频传输与识别结果回传。
* 🌍 **实时翻译**：支持 nllb200 多语言模型，自动将识别到的字幕实时翻译为目标语言，适用于多语种会议、跨国交流等场景。
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

## 📦 大文件管理与模型恢复

本项目未在仓库中直接存储大模型文件（如 nllb-200-distilled-600M-ct2-int8 下的 model.bin 等），请按如下方式获取和恢复：

1. 访问 [官方模型发布页](https://huggingface.co/facebook/nllb-200-distilled-600M) 下载所需模型文件。
2. 将下载的模型文件（如 model.bin、sentencepiece.bpe.model、tokenizer.json）放入 `nllb-200-distilled-600M-ct2-int8/` 目录下。
3.  **注意：** 模型大文件已被 `.gitignore` 排除，需单独下载到本地。

---

## 🧩 依赖管理说明

- **Python 依赖**：请使用 `requirements.txt` 安装，虚拟环境（如 venv、torch-env）不会纳入版本控制。
- **Node.js 依赖**：请在 `electron/` 目录下运行 `npm install`，`node_modules` 目录不会纳入版本控制。
- **模型文件**：需手动下载或本地恢复，避免仓库存储大文件。

---

## 🙏 鸣谢

* [SenseVoice (by 阿里达摩院)](https://github.com/FunAudioLLM/SenseVoice) — 自动语音识别核心模型
* [api4sensevoice](https://github.com/0x5446/api4sensevoice) — 基于 SenseVoice 的轻量化服务实现

---

## 📜 许可证

本项目采用 [MIT License](./LICENSE) 开源。
