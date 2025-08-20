"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, Heart } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatDate, getReadingTime } from "@/lib/api";
import Image from "next/image";

interface ArticleCarouselProps {
  articles: Article[];
}

export default function ArticleCarousel({ articles }: ArticleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + articles.length) % articles.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [articles.length]);

  if (!articles.length) return null;

  const currentArticle = articles[currentIndex];

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden group">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        <Image
          src={
            currentArticle.cover_image ||
            currentArticle.social_image ||
            "/placeholder.svg?height=400&width=800&query=blog post cover" ||
            "/placeholder.svg" ||
            "/placeholder.svg"
          }
          alt={currentArticle.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-3">
              <Image
                src={currentArticle.user.profile_image_90 || "/placeholder.svg"}
                alt={currentArticle.user.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm font-medium">
                {currentArticle.user.name}
              </span>
              <span className="text-sm opacity-80">
                {formatDate(currentArticle.published_at)}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2">
              {currentArticle.title}
            </h2>
            <p className="text-base opacity-90 mb-4 line-clamp-2">
              {currentArticle.description}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {getReadingTime(currentArticle.reading_time_minutes)}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {currentArticle.positive_reactions_count}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {articles.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <Link
        href={`/blog/${currentArticle.id}`}
        className="absolute inset-0 z-25"
      >
        <span className="sr-only">Read {currentArticle.title}</span>
      </Link>
    </div>
  );
}
