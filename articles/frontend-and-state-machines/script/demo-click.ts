import { showFloatingSurface } from "./lib.js";

const button = document.getElementById("demo-click")!;
let surface: { hide: () => void; el: Element } | null = null;

function onButtonPointerUp() {
  return surface ? hideSurface() : showSurface();
}

function onPointerDownOutside(e: PointerEvent) {
  if (!surface) return;
  if (surface.el.contains(e.target as Node)) return;
  if (button.contains(e.target as Node)) return;
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
