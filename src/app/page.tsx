import { Suspense } from "react";
import {
  fetchTopArticles,
  fetchTrendingArticles,
  fetchArticles,
} from "@/lib/api";
import TrendingPosts from "@/components/TrendingPosts";
import Header from "@/components/MainHeader";
import ArticleCarousel from "@/components/ArticleCarousel";
import BlogList from "@/components/BlogList";

async function HomePage() {
  const [topArticles, trendingArticles, latestArticles] = await Promise.all([
    fetchTopArticles(5),
    fetchTrendingArticles(4),
    fetchArticles(1, 6),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Carousel Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome to TechBlog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover the latest insights and stories from the developer
              community
            </p>
            <ArticleCarousel articles={topArticles} />
          </div>
        </section>

        {/* Trending Posts Section */}
        <TrendingPosts articles={trendingArticles} />

        {/* Latest Posts Section */}
        <BlogList articles={latestArticles} title="Latest Posts" />
      </main>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-muted rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomePage />
    </Suspense>
  );
}
