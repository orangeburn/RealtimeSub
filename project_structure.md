```
├── .trae\
│   └── rules\
│       └── project_rules.md
├── SenseVoice\
│   ├── .github\
│   │   └── ISSUE_TEMPLATE\
│   │       ├── ask_questions.md
│   │       ├── bug_report.md
│   │       ├── config.yaml
│   │       └── error_docs.md
│   ├── LICENSE
│   ├── README.md
│   ├── README_ja.md
│   ├── README_zh.md
│   ├── __pycache__\
│   ├── api.py
│   ├── data\
│   │   ├── train_example.jsonl
│   │   └── val_example.jsonl
│   ├── deepspeed_conf\
│   │   └── ds_stage1.json
│   ├── demo1.py
│   ├── demo2.py
│   ├── demo_libtorch.py
│   ├── demo_onnx.py
│   ├── export.py
│   ├── export_meta.py
│   ├── finetune.sh
│   ├── image\
│   │   ├── aed_figure.png
│   │   ├── asr_results.png
│   │   ├── asr_results1.png
│   │   ├── asr_results2.png
│   │   ├── dingding_funasr.png
│   │   ├── dingding_sv.png
│   │   ├── inference.png
│   │   ├── sensevoice.png
│   │   ├── sensevoice2.png
│   │   ├── ser_figure.png
│   │   ├── ser_table.png
│   │   ├── webui.png
│   │   └── wechat.png
│   ├── model.py
│   ├── requirements.txt
│   ├── utils\
│   │   ├── __init__.py
│   │   ├── ctc_alignment.py
│   │   ├── export_utils.py
│   │   ├── frontend.py
│   │   ├── infer_utils.py
│   │   └── model_bin.py
│   ├── venv\
│   │   ├── CHANGES.rst
│   │   ├── Include\
│   │   ├── Lib\
│   │   │   └── site-packages\
│   │   ├── Library\
│   │   │   ├── bin\
│   │   │   ├── lib\
│   │   │   └── share\
│   │   ├── README.rst
│   │   ├── Scripts\
│   │   │   ├── Activate.ps1
│   │   │   ├── activate
│   │   │   ├── activate.bat
│   │   │   ├── convert-caffe2-to-onnx.exe
│   │   │   ├── convert-onnx-to-caffe2.exe
│   │   │   ├── deactivate.bat
│   │   │   ├── f2py.exe
│   │   │   ├── fastapi.exe
│   │   │   ├── funasr-export.exe
│   │   │   ├── funasr-jsonl2scp.exe
│   │   │   ├── funasr-scp2jsonl.exe
│   │   │   ├── funasr-sensevoice2jsonl.exe
│   │   │   ├── funasr-train.exe
│   │   │   ├── funasr.exe
│   │   │   ├── gradio.exe
│   │   │   ├── httpx.exe
│   │   │   ├── huggingface-cli.exe
│   │   │   ├── isympy.exe
│   │   │   ├── jp.py
│   │   │   ├── jsonl2scp.exe
│   │   │   ├── markdown-it.exe
│   │   │   ├── modelscope.exe
│   │   │   ├── normalizer.exe
│   │   │   ├── numba
│   │   │   ├── pip.exe
│   │   │   ├── pip3.10.exe
│   │   │   ├── pip3.exe
│   │   │   ├── pygmentize.exe
│   │   │   ├── pygrun
│   │   │   ├── python.exe
│   │   │   ├── pythonw.exe
│   │   │   ├── ruff.exe
│   │   │   ├── scp2jsonl.exe
│   │   │   ├── sensevoice2jsonl.exe
│   │   │   ├── torchrun.exe
│   │   │   ├── tqdm.exe
│   │   │   ├── typer.exe
│   │   │   ├── upload_theme.exe
│   │   │   ├── uvicorn.exe
│   │   │   └── websockets.exe
│   │   ├── pyvenv.cfg
│   │   └── share\
│   │       └── man\
│   └── webui.py
├── api4sensevoice\
│   ├── .gitignore
│   ├── README.md
│   ├── client_wss.html
│   ├── model.py
│   ├── requirements.txt
│   ├── server.py
│   ├── server_wss.py
│   ├── speaker\
│   │   ├── speaker1_a_cn_16k.wav
│   │   ├── speaker1_b_cn_16k.wav
│   │   └── speaker2_a_cn_16k.wav
│   └── venv\
│       ├── CHANGES.rst
│       ├── Include\
│       ├── Lib\
│       │   └── site-packages\
│       ├── Library\
│       │   ├── bin\
│       │   ├── lib\
│       │   └── share\
│       ├── README.rst
│       ├── Scripts\
│       │   ├── Activate.ps1
│       │   ├── activate
│       │   ├── activate.bat
│       │   ├── convert-caffe2-to-onnx.exe
│       │   ├── convert-onnx-to-caffe2.exe
│       │   ├── datasets-cli.exe
│       │   ├── deactivate.bat
│       │   ├── dotenv.exe
│       │   ├── f2py.exe
│       │   ├── fastapi.exe
│       │   ├── funasr-export.exe
│       │   ├── funasr-jsonl2scp.exe
│       │   ├── funasr-scp2jsonl.exe
│       │   ├── funasr-sensevoice2jsonl.exe
│       │   ├── funasr-train.exe
│       │   ├── funasr.exe
│       │   ├── get_gprof
│       │   ├── get_objgraph
│       │   ├── huggingface-cli.exe
│       │   ├── isympy.exe
│       │   ├── jp.py
│       │   ├── jsonl2scp.exe
│       │   ├── modelscope.exe
│       │   ├── normalizer.exe
│       │   ├── numba
│       │   ├── pip.exe
│       │   ├── pip3.10.exe
│       │   ├── pip3.exe
│       │   ├── pygrun
│       │   ├── python.exe
│       │   ├── pythonw.exe
│       │   ├── scp2jsonl.exe
│       │   ├── sensevoice2jsonl.exe
│       │   ├── torchrun.exe
│       │   ├── tqdm.exe
│       │   ├── undill
│       │   ├── uvicorn.exe
│       │   └── websockets.exe
│       ├── pyvenv.cfg
│       └── share\
│           └── man\
├── electron\
│   ├── index.html
│   ├── main.js
│   ├── package-lock.json
│   ├── package.json
│   ├── preload.js
│   └── renderer.js
├── python\
│   ├── .env
│   ├── asr_server.py
│   ├── audio_capture_websocket.py
│   ├── device_check.py
│   ├── list_devices.py
│   ├── test.py
│   ├── test_recording_device_1_16000Hz.wav
│   ├── test_recording_device_5_16000Hz.wav
│   ├── test_recording_device_6_16000Hz.wav
│   ├── venv\
│   │   ├── Include\
│   │   ├── Lib\
│   │   │   └── site-packages\
│   │   ├── Scripts\
│   │   │   ├── Activate.ps1
│   │   │   ├── activate
│   │   │   ├── activate.bat
│   │   │   ├── clear_comtypes_cache.exe
│   │   │   ├── deactivate.bat
│   │   │   ├── dotenv.exe
│   │   │   ├── email_validator.exe
│   │   │   ├── f2py.exe
│   │   │   ├── fastapi.exe
│   │   │   ├── httpx.exe
│   │   │   ├── markdown-it.exe
│   │   │   ├── normalizer.exe
│   │   │   ├── numpy-config.exe
│   │   │   ├── pip.exe
│   │   │   ├── pip3.10.exe
│   │   │   ├── pip3.exe
│   │   │   ├── pygmentize.exe
│   │   │   ├── python.exe
│   │   │   ├── pythonw.exe
│   │   │   ├── typer.exe
│   │   │   ├── uvicorn.exe
│   │   │   ├── watchfiles.exe
│   │   │   └── websockets.exe
│   │   └── pyvenv.cfg
│   ├── websocket_server.py
│   └── websocket_server_test.py
├── run_integration_test.py
├── system_output_test.wav
├── test_audio_capture_detailed.py
├── test_modules.py
├── torch-env\
│   └── ...
├── vc_redist.x64.exe
└── venv\
    └── ...
```