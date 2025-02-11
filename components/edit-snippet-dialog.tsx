"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/data";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Code from "./code";
import { Snippet } from "@/types/snippets";

interface EditSnippetDialogProps {
  snippet: Snippet;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditSnippetDialog({
  snippet,
  open,
  onOpenChange,
}: EditSnippetDialogProps) {
  const [title, setTitle] = useState(snippet.title);
  const [description, setDescription] = useState(snippet.description);
  const [code, setCode] = useState(snippet.code);
  const [category, setCategory] = useState(snippet.category);

  useEffect(() => {
    setTitle(snippet.title);
    setDescription(snippet.description);
    setCode(snippet.code);
    setCategory(snippet.category);
  }, [snippet]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      toast.error("Code snippet cannot be empty!");
      return;
    }
    const response = await fetch("/api", {
      method: "PUT",
      body: JSON.stringify({
        id: snippet.id,
        title,
        description,
        code,
        category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      toast.success("Snippet updated successfully!");
      window.location.reload();
    } else {
      toast.error("Failed to delete snippet!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Snippet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter snippet title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter snippet description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-code">Code</Label>
            <Code
              code={code}
              category={category}
              minHeight="200px"
              setCode={setCode}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
