(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const n of t.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && s(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (t.credentials = "omit")
        : (t.credentials = "same-origin"),
      t
    );
  }
  function s(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = r(e);
    fetch(e.href, t);
  }
})();
async function c() {
  const dataJSON = [
    {
      name: "What is Crosshair Plus?",
      content:
        "Crosshair Plus is a browser extension that allows you to add a custom crosshair to any webpage.",
    },
    {
      name: "What are the benefits of using Crosshair Plus?",
      content:
        "Crosshair Plus can be useful for a variety of tasks, such as precision design work, aligning objects on a web page, or creating custom targeting reticles for games.",
    },
    {
      name: "How do I add a custom crosshair to a webpage?",
      content:
        "1. Install Crosshair Plus from your browser's extension store. <br> 2. Click on the Crosshair Plus icon in your browser's toolbar.<br> 3. Paste in any image into the 'Custom Image URL' input box.<br> 4. Click 'Reload' to update the image.",
    },
    {
      name: "Can I change the size of the crosshair?",
      content:
        "Yes, you can change the size of the crosshair at any time. Simply click on the Crosshair Plus icon in your browser's toolbar drag the 'Size' slider to the desired size.",
    },
    {
      name: "Can I use a custom image as my crosshair?",
      content:
        "Yes, you can upload a custom image to use as your crosshair. The image should be a PNG file with a transparent background.",
    },
    {
      name: "How do I turn the crosshair on or off on a webpage?",
      content:
        "Click on the Crosshair Plus icon in your browser's toolbar and press the 'Crosshair' toggle to turn it on or off",
    },
  ];
  dataJSON.forEach((r) => {
    document.getElementById("FAQ").innerHTML += `
    <div class="collapse collapse-arrow join-item border border-neutral">
    <input type="radio" name="my-accordion-4" />
    <div class="collapse-title text-xl font-medium">
      ${r.name}
    </div>
    <div class="collapse-content">
      <p>${r.content}</p>
    </div>
    </div>
    `;
  });
}
c();
