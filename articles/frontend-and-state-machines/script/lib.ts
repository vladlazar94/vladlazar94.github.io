export function showFloatingSurface(button: Element) {
  const surface = button.parentNode!.querySelector("figure")!;
  const parent = surface!.parentNode!;
  const { top, left, width } = button.getBoundingClientRect();

  surface.classList.remove("hidden");
  surface.classList.add("flex");
  surface.style.position = "absolute";
  surface.style.left = `${left + width + 8}px`;
  surface.style.top = `${top + window.scrollY}px`;
  document.body.appendChild(surface);

  const hide = () => {
    surface.style.position = "initial";
    surface.classList.add("hidden");
    surface.classList.remove("flex");
    parent.append(surface);
  };

  return { hide, el: surface };
}
