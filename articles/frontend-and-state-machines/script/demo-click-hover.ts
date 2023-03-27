import { showFloatingSurface } from "./lib.js";

const ShowDelayInMs = 1000;
const hideDelayInMS = 500;

const button = document.getElementById("demo-click-hover")!;

let surface: { hide: () => void; el: Element } | null = null;
let cancelHiding: (() => void) | null = null;
let cancelShowing: (() => void) | null = null;
let openedViaPointer = false;

function onPointerUp() {
  if (surface) return hideSurface();
  openedViaPointer = true;
  showSurface();
}

function onPointerDown() {
  if (cancelShowing) cancelShowing();
}

function onMouseEntersButton() {
  if (cancelHiding) cancelHiding();
  if (surface) return;
  if (cancelShowing) cancelShowing();
  showWithDelay();
}

function onMouseLeavesButton() {
  if (openedViaPointer) return;
  if (cancelShowing) return cancelShowing();
  hideWithDelay();
}

function onPointerDownOutside(e: PointerEvent) {
  if (!surface) return;
  if (surface.el.contains(e.target as Node)) return;
  if (button.contains(e.target as Node)) return;
  hideSurface();
}

function onMouseLeavesSurface() {
  if (!openedViaPointer) hideWithDelay();
}

function onMouseEntersSurface() {
  if (cancelHiding) cancelHiding();
}

function showSurface() {
  if (surface) return;
  if (cancelShowing) cancelShowing();
  surface = showFloatingSurface(button);
  window.addEventListener("pointerdown", onPointerDownOutside);
  surface.el.addEventListener("mouseenter", onMouseEntersSurface);
  surface.el.addEventListener("mouseleave", onMouseLeavesSurface);
}

function hideSurface() {
  if (!surface) return;
  if (cancelHiding) cancelHiding();
  window.removeEventListener("pointerdown", onPointerDownOutside);
  surface.el.removeEventListener("mouseenter", onMouseEntersSurface);
  surface.el.removeEventListener("mouseleave", onMouseLeavesSurface);
  surface.hide();
  surface = null;
  openedViaPointer = false;
}

function showWithDelay() {
  const timeoutId = setTimeout(showSurface, ShowDelayInMs);
  cancelShowing = () => {
    clearTimeout(timeoutId);
    cancelShowing = null;
  };
}

function hideWithDelay() {
  const timeoutId = setTimeout(hideSurface, hideDelayInMS);
  cancelHiding = () => {
    clearTimeout(timeoutId);
    cancelHiding = null;
  };
}

button.addEventListener("pointerdown", onPointerDown);
button.addEventListener("pointerup", onPointerUp);
button.addEventListener("mouseenter", onMouseEntersButton);
button.addEventListener("mouseleave", onMouseLeavesButton);
