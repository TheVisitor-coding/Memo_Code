import { dracula } from "@uiw/codemirror-theme-dracula";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { sass } from "@codemirror/lang-sass";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { sql } from "@codemirror/lang-sql";
import { yaml } from "@codemirror/lang-yaml";
import { vue } from "@codemirror/lang-vue";
interface CodeProps {
  code: string;
  category: string;
  readOnly?: boolean;
  minHeight?: string;
  setCode?: (code: string) => void;
}

function Code({ code, category, readOnly, minHeight, setCode }: CodeProps) {
  const languageExtensions = {
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

  const keyExtension =
    category.toLowerCase() as keyof typeof languageExtensions;

  const extension = languageExtensions[keyExtension] || html();

  return (
    <ReactCodeMirror
      value={code}
      theme={dracula}
      readOnly={readOnly}
      extensions={[extension]}
      minHeight={minHeight}
      onChange={(e) => setCode && setCode(e)}
    />
  );
}

export default Code;
