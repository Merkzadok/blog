"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/MainHeader";
import BlogList from "@/components/BlogList";
import BlogPagination from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { fetchArticles } from "@/lib/api";
import type { Article } from "@/lib/types";

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  const articlesPerPage = 10;

  useEffect(() => {
    const page = Number.parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";

    setCurrentPage(page);
    setSearchQuery(search);

    loadArticles(page, search);
  }, [searchParams]);

  const loadArticles = async (page: number, search = "") => {
    setLoading(true);
    try {
      // Note: dev.to API doesn't support search, so we'll fetch all and filter client-side for demo
      const fetchedArticles = await fetchArticles(page, articlesPerPage);
      let filteredArticles = fetchedArticles;

      if (search) {
        filteredArticles = fetchedArticles.filter((article) => {
          const searchLower = search.toLowerCase();

          // Check tag_list carefully
          const tagsMatch = Array.isArray(article.tag_list)
            ? article.tag_list.some((tag) =>
                tag.toLowerCase().includes(searchLower)
              )
            : typeof article.tag_list === "string"
            ? article.tag_list.toLowerCase().includes(searchLower)
            : false;

          return (
            article.title.toLowerCase().includes(searchLower) ||
            article.description.toLowerCase().includes(searchLower) ||
            tagsMatch
          );
        });
      }

      setArticles(filteredArticles);
      // Estimate total pages (dev.to API doesn't provide total count)
      setTotalPages(Math.max(1, Math.ceil(1000 / articlesPerPage))); // Assuming ~1000 articles max
    } catch (error) {
      console.error("Error loading articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/blog?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    params.set("page", "1");
    router.push(`/blog?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    router.push("/blog");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            All Blog Posts
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Explore our collection of articles and insights from the developer
            community
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Search
            </Button>
            {searchQuery && (
              <Button type="button" variant="ghost" onClick={clearSearch}>
                Clear
              </Button>
            )}
          </form>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              {loading
                ? "Searching..."
                : `Found ${articles.length} articles for "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card border rounded-lg p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/3">
                      <div className="aspect-video bg-muted rounded-lg"></div>
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-muted rounded w-16"></div>
                        <div className="h-6 bg-muted rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Articles List */}
        {!loading && articles.length > 0 && (
          <>
            <BlogList articles={articles} title="" />
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* No Results */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No articles found
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? `No articles match your search for "${searchQuery}"`
                : "No articles available at the moment"}
            </p>
            {searchQuery && (
              <Button onClick={clearSearch} variant="outline">
                Clear search and view all articles
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
