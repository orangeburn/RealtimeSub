window.addEventListener("DOMContentLoaded", () => {
  if (window.electronAPI && window.electronAPI.onSubtitle) {
    window.electronAPI.onSubtitle((text) => {
      const el = document.getElementById('subtitle');
      if (el) {
        el.innerText = text;
        console.log("💬 [renderer] 显示字幕:", text);
      }
    });
  } else {
    console.error("❌ electronAPI 未正确注入");
  }
});
