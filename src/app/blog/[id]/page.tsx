import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchArticleById } from "@/lib/api";
import Header from "@/components/MainHeader";
import BlogDetailContent from "@/components/BlogDetailContent";
import LoadingFallback from "@/components/LoadingFallBack";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const article = await fetchArticleById(Number.parseInt(id));

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogDetailContent article={article} />
    </div>
  );
}

export default function Page({ params }: BlogDetailPageProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BlogDetailPage params={params} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const article = await fetchArticleById(Number.parseInt(id));

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | ByteThoughts`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.cover_image ? [article.cover_image] : [],
    },
  };
}
