import { dracula } from "@uiw/codemirror-theme-dracula";
import ReactCodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { languageExtensions } from "@/lib/data";
interface CodeProps {
  code: string;
  category: string;
  readOnly?: boolean;
  minHeight?: string;
  setCode?: (code: string) => void;
}

function Code({ code, category, readOnly, minHeight, setCode }: CodeProps) {
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
