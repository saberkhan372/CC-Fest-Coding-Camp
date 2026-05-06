(() => {
  const EDITOR_URL = "https://editor.p5js.org/";
  const CODE_SELECTORS = [
    "#codeOutput",
    "#code-preview",
    "#codeDisplay",
    "#code-display",
    "#codePreview",
    "#array-display",
    "#array-code",
    "#classCode",
    "#code",
    "#fixed",
    "#broken"
  ];

  const style = document.createElement("style");
  style.textContent = `
    .p5-export-bar{
      display:flex;
      justify-content:flex-end;
      gap:8px;
      margin:10px 0;
      font-family:"DM Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
    }
    .p5-export-btn{
      border:1px solid rgba(44,42,38,.12);
      border-radius:999px;
      background:#fff;
      color:#2c2a26;
      padding:8px 12px;
      font:700 12px "DM Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
      cursor:pointer;
      box-shadow:0 1px 2px rgba(0,0,0,.04);
    }
    .p5-export-btn.primary{
      background:#f5a800;
      border-color:#f5a800;
      color:#211f1c;
    }
    .p5-export-btn:hover{transform:translateY(-1px)}
  `;
  document.head.appendChild(style);

  function visibleCodeElement() {
    return codeElements().find((el) => {
      const text = getCode(el);
      const box = el.getBoundingClientRect();
      return text && text.length > 8 && box.width > 0 && box.height > 0;
    });
  }

  function codeElements() {
    return CODE_SELECTORS.flatMap((selector) => Array.from(document.querySelectorAll(selector)));
  }

  function getCode(el) {
    if (!el) return "";
    if ("value" in el) return el.value.trim();
    return (el.textContent || "").trim();
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    return copied;
  }

  function setButtonText(button, text) {
    const original = button.dataset.label || button.textContent;
    button.dataset.label = original;
    button.textContent = text;
    window.setTimeout(() => {
      button.textContent = original;
    }, 1200);
  }

  function pageAlreadyHasCopyControl(target) {
    const localContainer = target.closest(".code-panel,.code-box,.panel,.card,.group,aside,section") || document;
    const copyButtons = Array.from(localContainer.querySelectorAll("button"));
    const pageCopyButtons = Array.from(document.querySelectorAll("button"));
    return [...copyButtons, ...pageCopyButtons].some((button) => {
      if (button.classList.contains("p5-export-btn")) return false;
      return /copy/i.test(button.textContent || "");
    });
  }

  function insertBar(target) {
    if (!target || target.dataset.p5ExportReady) return;
    target.dataset.p5ExportReady = "true";
    const hasCopyControl = pageAlreadyHasCopyControl(target);

    const bar = document.createElement("div");
    bar.className = "p5-export-bar";
    bar.setAttribute("aria-label", "Open this generated p5.js code in the p5.js Web Editor");

    const copyButton = document.createElement("button");
    copyButton.className = "p5-export-btn";
    copyButton.type = "button";
    copyButton.textContent = "Copy Code";

    const p5Button = document.createElement("button");
    p5Button.className = "p5-export-btn primary";
    p5Button.type = "button";
    p5Button.textContent = "↗ p5 Editor";

    copyButton.addEventListener("click", async () => {
      const code = getCode(target);
      if (!code) return setButtonText(copyButton, "No code yet");
      await copyText(code);
      setButtonText(copyButton, "Copied");
    });

    p5Button.addEventListener("click", async () => {
      const code = getCode(target);
      if (!code) return setButtonText(p5Button, "No code yet");
      await copyText(code);
      setButtonText(p5Button, "Copied");
      window.open(EDITOR_URL, "_blank", "noopener,noreferrer");
    });

    if (!hasCopyControl) bar.append(copyButton);
    bar.append(p5Button);
    target.insertAdjacentElement("beforebegin", bar);
  }

  function init() {
    if (document.querySelector("#starter-editor")) return;
    let tries = 0;
    const tryInsert = () => {
      if (document.querySelector(".p5-export-bar")) return true;
      const target = visibleCodeElement();
      if (!target) return false;
      insertBar(target);
      return true;
    };

    if (tryInsert()) return;

    const interval = window.setInterval(() => {
      tries += 1;
      if (tryInsert() || tries > 40) {
        if (!document.querySelector(".p5-export-bar")) {
          insertBar(codeElements()[0]);
        }
        window.clearInterval(interval);
      }
    }, 100);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
