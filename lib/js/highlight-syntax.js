import highlightjs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js";
import typescript from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/typescript.min.js";

const a11yTheme = {
  light: getThemeStylesheet(
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/a11y-light.min.css"
  ),
  dark: getThemeStylesheet(
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/a11y-dark.min.css"
  ),
};

function getThemeStylesheet(url) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  link.media = "all";
  return link;
}

function setupTheme(theme) {
  const matchList = window.matchMedia("(prefers-color-scheme: dark)");
  document.head.append(matchList.matches ? theme.dark : theme.light);
  matchList.addEventListener("change", () => {
    console.log(document.head);
    if (document.head.contains(theme.dark)) {
      document.head.removeChild(theme.dark);
      document.head.append(theme.light);
      return;
    }
    document.head.removeChild(theme.light);
    document.head.append(theme.dark);
  });
}

export function highlightSyntax() {
  setupTheme(a11yTheme);
  highlightjs.registerLanguage("typescript", typescript);
  highlightjs.highlightAll();
}
