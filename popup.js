// Load size
chrome.storage.sync.get("crosshairSize", function (data) {
  document.getElementById("sizeSlider").value = data.crosshairSize; // Default 50
});

// Save size
document.getElementById("sizeSlider").addEventListener("input", function () {
  const crosshairSize = parseInt(this.value);
  chrome.storage.sync.set({ crosshairSize });
});

document.getElementById("sizeSlider").addEventListener("change", function () {
  const crosshairSize = parseInt(this.value);
  chrome.storage.sync.set({ crosshairSize: crosshairSize });
});

// Load settings
chrome.storage.sync.get(["showCrosshair", "crosshairSize"], function (data) {
  document.getElementById("crosshairToggle").checked = data.showCrosshair;
});

// Save settings
document
  .getElementById("crosshairToggle")
  .addEventListener("change", function () {
    let showCrosshair = this.checked;
    chrome.storage.sync.set({ showCrosshair: showCrosshair });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { reloadCrosshair: true });
    });
  });

document
  .getElementById("crosshairImgInput")
  .addEventListener("change", function (data) {
    chrome.storage.sync.set({ crosshairImg: this.value });;
  });

document
  .querySelector("#reloadCrosshair")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { reloadCrosshair: true });
    });
  });
