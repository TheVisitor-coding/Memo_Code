"use client";

import { useState } from "react";
import { Copy, Trash, Edit } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Snippet } from "@/lib/types";
import EditSnippetDialog from "./edit-snippet-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';

interface SnippetCardProps {
  snippet: Snippet;
  // onDelete: (id: string) => void;
  // onUpdate: (snippet: Snippet) => void;
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(snippet.code);
    toast.success("Copied to clipboard!");
  };

  const handleDelete = async (id: string | number) => {
    const response = await fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      toast.success("Snippet deleted successfully!");
      window.location.reload();
    } else {
      toast.error("Failed to delete snippet!");
    }
  }

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold">{snippet.title}</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Popover open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setRemoveDialogOpen(true)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4 bg-white rounded-md shadow-lg">
                  <p className="text-sm mb-4">Are you sure you want to delete this snippet?</p>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setRemoveDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleDelete(snippet.id);
                        setRemoveDialogOpen(false);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Badge variant="secondary">{snippet.category}</Badge>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground mb-2">{snippet.description}</p>
          {/* <CodeMirror
            value={snippet.code}
            theme={dracula}
            readOnly
          /> */}
        </CardContent>
        <CardFooter>
          <Button variant="secondary" className="w-full" onClick={copyToClipboard}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Code
          </Button>
        </CardFooter>
      </Card>

      <EditSnippetDialog
        snippet={snippet}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </>
  );
}