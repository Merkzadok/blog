import { Card, CardContent } from "@/components/ui/card";
import { Clock, Heart } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatDate, getReadingTime } from "@/lib/api";
import Image from "next/image";

interface TrendingPostsProps {
  articles: Article[];
}

export default function TrendingPosts({ articles }: TrendingPostsProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Trending Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <Link href={`/blog/${article.id}`}>
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={
                        article.cover_image ||
                        article.social_image ||
                        "/placeholder.svg?height=200&width=300&query=blog post thumbnail" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src={
                          article.user.profile_image_90 || "/placeholder.svg"
                        }
                        alt={article.user.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">
                        {article.user.name}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getReadingTime(article.reading_time_minutes)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {article.positive_reactions_count}
                        </div>
                      </div>
                      <span>{formatDate(article.published_at)}</span>
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
