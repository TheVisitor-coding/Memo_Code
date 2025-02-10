"use client";

import { useState } from "react";
import { Copy, Trash, Edit } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Snippet } from "@/lib/types";
import EditSnippetDialog from "./edit-snippet-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Code from "./code";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { languageColors } from "@/lib/data";

interface SnippetCardProps {
  snippet: Snippet;
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

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
  };

  const keyColor =
    snippet.category.toLowerCase() as keyof typeof languageColors;
  const categoryColor = languageColors[keyColor];
  console.log(categoryColor);

  return (
    <>
      <Card className="flex card flex-col w-fit">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold">
              {snippet.title}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Popover
                open={removeDialogOpen}
                onOpenChange={setRemoveDialogOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setRemoveDialogOpen(true)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4 bg-white rounded-md shadow-lg">
                  <p className="text-sm mb-4">
                    Are you sure you want to delete this snippet?
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => setRemoveDialogOpen(false)}
                    >
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
          <span
            style={{
              backgroundColor: categoryColor ? `${categoryColor}` : "gray",
            }}
            className={`text-white text-xs font-semibold me-2 px-2.5 py-0.5 w-fit rounded-sm`}
          >
            {snippet.category}
          </span>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground mb-2">
            {snippet.description}
          </p>
          <Code
            code={snippet.code}
            category={snippet.category}
            readOnly={true}
          />
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => copyToClipboard(snippet)}
          >
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
