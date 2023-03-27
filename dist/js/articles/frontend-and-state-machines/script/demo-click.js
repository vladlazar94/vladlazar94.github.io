import { showFloatingSurface } from "./lib.js";
const button = document.getElementById("demo-click");
let surface = null;
function onButtonPointerUp() {
  return surface ? hideSurface() : showSurface();
}
function onPointerDownOutside(e) {
  if (!surface) return;
  if (surface.el.contains(e.target)) return;
  if (button.contains(e.target)) return;
  hideSurface();
}
function showSurface() {
  if (surface) return;
  surface = showFloatingSurface(button);
  window.addEventListener("pointerdown", onPointerDownOutside);
}
function hideSurface() {
  if (!surface) return;
  window.removeEventListener("pointerdown", onPointerDownOutside);
  surface.hide();
  surface = null;
}
button.addEventListener("pointerup", onButtonPointerUp);
