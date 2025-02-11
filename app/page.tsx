"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SnippetCard from "@/components/snippet-card";
import CreateSnippetDialog from "@/components/create-snippet-dialog";
import { categories } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Snippet } from "@/types/snippets";

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSnippets() {
      try {
        setIsLoading(true);
        const response = await fetch("/api");
        const data = await response.json();
        setSnippets(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSnippets();
  }, []);

  const filteredSnippets = snippets.filter((snippet: Snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || snippet.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="h-6 w-6" />
                <h1 className="text-2xl font-bold">SnippetVault</h1>
              </div>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Snippet
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-[250px_1fr]">
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search snippets..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category ? null : category
                        )
                      }
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {
                isLoading && (
                  <Skeleton className="w-full h-36" />
                )
              }
              {filteredSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
          </div>
        </main>

        <CreateSnippetDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </div>
    </>
  );
}
