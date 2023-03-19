import { showFloatingSurface } from "./lib.mjs";

const ShowDelayInMs = 1000;
const hideDelayInMS = 500;

const button = document.getElementById("demo-hover");

let surface = null;
let cancelHiding = null;
let cancelShowing = null;

function onMouseEntersButton() {
  if (cancelHiding) cancelHiding();
  if (surface) return;
  if (cancelShowing) cancelShowing();
  showWithDelay();
}

function onMouseLeavesButton() {
  if (cancelShowing) return cancelShowing();
  hideWithDelay();
}

function onMouseLeavesSurface() {
  hideWithDelay();
}

function onMouseEntersSurface() {
  if (cancelHiding) cancelHiding();
}

function showSurface() {
  if (surface) return;
  if (cancelShowing) cancelShowing();
  surface = showFloatingSurface(button);
  surface.el.addEventListener("mouseenter", onMouseEntersSurface);
  surface.el.addEventListener("mouseleave", onMouseLeavesSurface);
}

function hideSurface() {
  if (!surface) return;
  if (cancelHiding) cancelHiding();
  surface.el.removeEventListener("mouseenter", onMouseEntersSurface);
  surface.el.removeEventListener("mouseleave", onMouseLeavesSurface);
  surface.hide();
  surface = null;
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

button.addEventListener("mouseenter", onMouseEntersButton);
button.addEventListener("mouseleave", onMouseLeavesButton);
