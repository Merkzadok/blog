"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Heart,
  MessageCircle,
  Share2,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Article } from "@/lib/types";
import { formatDate, getReadingTime } from "@/lib/api";
import Image from "next/image";

interface BlogDetailContentProps {
  article: Article;
}

export default function BlogDetailContent({ article }: BlogDetailContentProps) {
  const router = useRouter();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 -ml-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {Array.isArray(article.tag_list)
              ? article.tag_list.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))
              : typeof article.tag_list === "string"
              ? article.tag_list.split(",").map((tag) => (
                  <Badge key={tag.trim()} variant="secondary">
                    {tag.trim()}
                  </Badge>
                ))
              : null}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {article.description}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={article.user.profile_image_90 || "/placeholder.svg"}
                alt={article.user.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-foreground">
                  {article.user.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  @{article.user.username}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {getReadingTime(article.reading_time_minutes)}
              </div>
              <span>{formatDate(article.published_at)}</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {article.cover_image && (
          <div className="mb-8 relative h-64 md:h-96">
            <Image
              src={article.cover_image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article Stats and Actions */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {article.positive_reactions_count} reactions
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {article.comments_count} comments
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Dev.to
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert mb-12">
          <div
            dangerouslySetInnerHTML={{ __html: article.body_html }}
            className="[&>*]:mb-4 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>blockquote]:border-l-4 [&>blockquote]:border-accent [&>blockquote]:pl-4 [&>blockquote]:italic [&>pre]:bg-muted [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>code]:bg-muted [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>img]:rounded-lg [&>img]:my-6"
          />
        </article>

        <Separator className="mb-8" />

        {/* Author Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Image
                src={article.user.profile_image_90 || "/placeholder.svg"}
                alt={article.user.name}
                width={64}
                height={64}
                className="rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {article.user.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  @{article.user.username}
                </p>
                <div className="flex items-center gap-4">
                  {article.user.website_url && (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={article.user.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Website
                      </Link>
                    </Button>
                  )}
                  {article.user.twitter_username && (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`https://twitter.com/${article.user.twitter_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </Link>
                    </Button>
                  )}
                  {article.user.github_username && (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`https://github.com/${article.user.github_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
