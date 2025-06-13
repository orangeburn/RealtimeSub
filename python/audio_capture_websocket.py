import asyncio
import websockets
import sounddevice as sd
import numpy as np
import json
import sys
import argparse
import time

SAMPLE_RATE = 16000
CHANNELS = 1
CHUNK_DURATION = 0.5
CHUNK_SIZE = int(SAMPLE_RATE * CHUNK_DURATION)

def find_audio_device():
    keywords = ["loopback", "stereo mix", "立体声混音", "主声音捕获"]
    devices = sd.query_devices()
    print("🎧 正在扫描音频输入设备...\n")
    for i, dev in enumerate(devices):
        name = dev['name'].lower()
        if dev['max_input_channels'] > 0 and any(k in name for k in keywords):
            print(f"✅ 选中设备: [{i}] {dev['name']}")
            return i
    print("❌ 未找到合适的系统音频输入设备，请确认“立体声混音”或“loopback”已启用。")
    sys.exit(1)

class AudioStreamer:
    def __init__(self, device_index):
        self.device_index = device_index
        self.ws = None
        self.running = True
        self.audio_queue = None   # 延后初始化
        self.loop = None          # 延后初始化

    def audio_callback(self, indata, frames, time_info, status):
        if status:
            print("⚠️ 音频状态警告:", status)
        print(f"🎤 捕获到音频数据，shape: {indata.shape}, dtype: {indata.dtype}")
        pcm_data = (indata * 32767).astype(np.int16).tobytes()
        print(f"📦 放入队列数据大小: {len(pcm_data)}")

        try:
            self.loop.call_soon_threadsafe(self.audio_queue.put_nowait, pcm_data)
        except RuntimeError as e:
            print(f"❌ 无法放入音频数据队列: {e}")

    async def send_audio(self):
        print("🚀 send_audio() 协程启动 ✅")
        try:
            while self.running:
                print("⌛ 等待队列音频数据...")
                pcm_data = await self.audio_queue.get()
                print(f"📤 取出音频数据，长度: {len(pcm_data)} bytes")
                if self.ws:
                    try:
                        if self.ws.state == websockets.protocol.State.OPEN:
                            await self.ws.send(pcm_data)
                            print(f"📤 Sent audio chunk: {len(pcm_data)} bytes")
                        else:
                            print("⚠️ WebSocket 不是打开状态，等待重连...")
                            await asyncio.sleep(0.5)
                    except Exception as e:
                        print(f"⚠️ 发送音频异常，可能连接已断开: {e}")
                        await asyncio.sleep(0.5)
                else:
                    print("⚠️ WebSocket 未初始化，等待连接...")
                    await asyncio.sleep(0.5)
        except asyncio.CancelledError:
            print("发送任务已取消")
        except Exception as e:
            print("发送音频异常:", e)



    async def recv_msgs(self):
        print("📡 recv_msgs() 协程启动")
        try:
            async for message in self.ws:
                try:
                    data = json.loads(message)
                    if 'text' in data:
                        print("💬 实时识别:", data['text'])
                except Exception:
                    print("⚠️ 解析服务器消息失败:", message)
        except websockets.ConnectionClosed:
            print("❌ WebSocket 连接关闭")
        except Exception as e:
            print("接收消息异常:", e)

    async def run(self, ws_url):
        print("🧪 AudioStreamer.run() 已启动")
        self.loop = asyncio.get_running_loop()         # 主线程的事件循环
        self.audio_queue = asyncio.Queue()             # 与主 loop 绑定

        while self.running:
            print("🔁 run() 循环开始")
            try:
                print(f"🔗 尝试连接 WebSocket：{ws_url}")
                async with websockets.connect(ws_url) as websocket:
                    self.ws = websocket
                    print("✅ WebSocket 已连接")

                    print("🟡 准备进入 sd.InputStream() block...")
                    with sd.InputStream(
                        samplerate=SAMPLE_RATE,
                        channels=CHANNELS,
                        dtype='float32',
                        blocksize=CHUNK_SIZE,
                        callback=self.audio_callback,
                        device=self.device_index):

                        print("🚀 成功进入 sd.InputStream block ✅")
                        print("🚀 准备启动 send_audio 和 recv_msgs")

                        send_task = asyncio.create_task(self.send_audio())
                        recv_task = asyncio.create_task(self.recv_msgs())

                        await asyncio.sleep(1)
                        print("🟢 send_audio / recv_msgs 已启动任务调度")
                        print("⏳ 等待 send_audio 和 recv_msgs 完成...")

                        done, pending = await asyncio.wait(
                            [send_task, recv_task],
                            return_when=asyncio.FIRST_COMPLETED)

                        for task in pending:
                            task.cancel()
                        print("🧹 清理挂起任务完毕")
            except Exception as e:
                print(f"❗ run() 运行异常: {e}")
                await asyncio.sleep(3)

    def stop(self):
        self.running = False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Audio capture and WebSocket streaming.")
    parser.add_argument('--uri', type=str, default="ws://127.0.0.1:27000/ws/transcribe", help='WebSocket server URI.')
    args = parser.parse_args()

    device_index = find_audio_device()
    streamer = AudioStreamer(device_index)

    try:
        asyncio.run(streamer.run(args.uri))
    except KeyboardInterrupt:
        print("\n🚦 退出程序，停止采集...")
        streamer.stop()
        time.sleep(1)
        print("✅ 程序结束。")
