import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { sass } from "@codemirror/lang-sass";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { sql } from "@codemirror/lang-sql";
import { yaml } from "@codemirror/lang-yaml";
import { vue } from "@codemirror/lang-vue";

export const categories = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue",
  "Nodejs",
  "Python",
  "CSS",
  "HTML",
  "Database",
  "Docker",
  "Documentation",
  "PHP",
  "Shell",
  "Yaml",
  "Config",
];

export const languageExtensions = {
  javascript: javascript(),
  typescript: javascript({ typescript: true }),
  react: javascript({ jsx: true, typescript: true }),
  nodejs: javascript(),
  python: python(),
  css: sass(),
  html: html(),
  documentation: markdown(),
  php: php(),
  database: sql(),
  docker: yaml(),
  vue: vue(),
  shell: markdown(),
  yaml: yaml(),
  config: yaml(),
} as const;

export const languageColors = {
  javascript: "#d8b121",
  typescript: "#3178c6",
  react: "#61dafb",
  nodejs: "#3c873a",
  python: "#70A37F",
  css: "#264de4",
  html: "#e44d26",
  documentation: "#00748e",
  php: "#8993be",
  database: "#FF6D00",
  docker: "#B26700",
  vue: "#42b883",
  shell: "#4EAA25",
  yaml: "#cb171e",
  config: "#161032",
};
