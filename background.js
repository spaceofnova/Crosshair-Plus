const color = '#3aa757';
const crosshairImg = chrome.runtime.getURL('images/crosshair.svg');
const crosshairSize = "100"
const crosshairToggle = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color, crosshairImg, crosshairSize, crosshairToggle});
  console.log("defaults set")
});
