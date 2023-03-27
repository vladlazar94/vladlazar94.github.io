import "./script/demo-click.js";
import "./script/demo-hover.js";
import "./script/demo-click-hover.js";
import { highlightSyntax } from "../../lib/js/highlight-syntax.js";
async function loadSourceCode() {
  const codes = Array.from(document.querySelectorAll("code"));
  const updates = codes.map(async (code) => {
    const srcPath = code.dataset["srcPath"];
    if (!srcPath) return;
    const src = await fetch(srcPath).then((resp) => resp.text());
    code.textContent = src;
  });
  return await Promise.all(updates);
}
async function init() {
  await loadSourceCode();
  highlightSyntax();
  document.body.classList.remove("loading");
}
init();
