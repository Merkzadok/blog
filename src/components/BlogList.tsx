import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatDate, getReadingTime } from "@/lib/api";

interface BlogListProps {
  articles: Article[];
  title?: string;
}

export default function BlogList({
  articles,
  title = "Latest Posts",
}: BlogListProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">{title}</h2>
        <div className="space-y-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <Link href={`/blog/${article.id}`}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/3">
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <img
                          src={
                            article.cover_image ||
                            article.social_image ||
                            "/placeholder.svg?height=200&width=300&query=blog post cover" ||
                            "/placeholder.svg"
                          }
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            article.user.profile_image_90 || "/placeholder.svg"
                          }
                          alt={article.user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium">
                            {article.user.name}
                          </span>
                          <span>•</span>
                          <span>{formatDate(article.published_at)}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-muted-foreground line-clamp-3">
                        {article.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {article.tag_list.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {getReadingTime(article.reading_time_minutes)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {article.positive_reactions_count}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {article.comments_count}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
