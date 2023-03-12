import highlightjs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js";
import typescript from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/typescript.min.js";

highlightjs.registerLanguage("typescript", typescript);
highlightjs.highlightAll();
