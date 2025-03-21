import { Snippet } from "@/types/snippets";
import { toast } from "sonner";

export const copyToClipboard = async (snippet: Snippet) => {
  await navigator.clipboard.writeText(snippet.code);
  toast.success("Copied to clipboard!");
};
