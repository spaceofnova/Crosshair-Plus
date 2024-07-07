let crosshairDiv, crosshairImg;
crosshairStyle = {
  background: "transparent",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 99999999,
  margin: 0,
  padding: 0,
  boxShadow: 'none',
  borderRadius: 0
};

// Function to add the crosshair
function addCrosshair(hidden) {
  crosshairDiv = document.createElement('div');
  Object.assign(crosshairDiv.style, crosshairStyle);
  crosshairImg = document.createElement("img");
  crosshairImg.style.width = "100%";
  crosshairImg.style.height = "100%";

  // Load crosshair size setting
  chrome.storage.sync.get("crosshairSize", function (data) {
    crosshairDiv.style.width = `${data.crosshairSize}px`;
    crosshairDiv.style.height = `${data.crosshairSize}px`;
  });

  chrome.storage.sync.get("crosshairImg", function (data) {
    crosshairImg.setAttribute(
      "src",
      data.crosshairImg ||
        "https://files-novaspace.replit.app/pngs/crosshair.png"
    );
  });

  crosshairDiv.append(crosshairImg);

  if (!document.body) {
    setTimeout(() => {
      document.querySelector('html').appendChild(crosshairDiv);
      crosshairDiv.attributeStyleMap.clear();
      Object.assign(crosshairDiv.style, crosshairStyle);
    }, 2000);
  } else {
    document.querySelector('html').appendChild(crosshairDiv);
    crosshairDiv.attributeStyleMap.clear();
    Object.assign(crosshairDiv.style, crosshairStyle);
  }
  if (hidden) {
    crosshairDiv.style.display = "none";
  } else {
    crosshairDiv.style.display = "block";
  }

  // Listen for messages to toggle crosshair or update its size
  chrome.runtime.onMessage.addListener((message) => {
    if (message.reloadCrosshair) {
      chrome.storage.sync.get(
        ["showCrosshair", "crosshairSize"],
        function (data) {
          if (data.showCrosshair == true) {
            crosshairDiv.style.display = "block";
          } else {
            crosshairDiv.style.display = "none";
          }
          crosshairDiv.style.width = data.crosshairSize + "px";
          crosshairDiv.style.height = data.crosshairSize + "px";
        }
      );
    }
  });
}

// Load initial settings
chrome.storage.sync.get(["showCrosshair", "crosshairSize"], function (data) {
  if (data.showCrosshair) {
    addCrosshair();
  } else {
    addCrosshair({ hidden: true });
  }
});
