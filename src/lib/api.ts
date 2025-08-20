import type { Article } from "./types";

const BASE_URL = "https://dev.to/api/articles";

export async function fetchArticles(
  page = 1,
  per_page = 10
): Promise<Article[]> {
  try {
    const response = await fetch(
      `${BASE_URL}?page=${page}&per_page=${per_page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }
    const articles: Article[] = await response.json();
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function fetchTopArticles(count = 5): Promise<Article[]> {
  try {
    const response = await fetch(`${BASE_URL}?top=1&per_page=${count}`);
    if (!response.ok) {
      throw new Error("Failed to fetch top articles");
    }
    const articles: Article[] = await response.json();
    return articles;
  } catch (error) {
    console.error("Error fetching top articles:", error);
    return [];
  }
}

export async function fetchTrendingArticles(count = 4): Promise<Article[]> {
  try {
    const response = await fetch(`${BASE_URL}?top=3&per_page=${count}`);
    if (!response.ok) {
      throw new Error("Failed to fetch trending articles");
    }
    const articles: Article[] = await response.json();
    return articles;
  } catch (error) {
    console.error("Error fetching trending articles:", error);
    return [];
  }
}

export async function fetchArticleById(id: number): Promise<Article | null> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch article");
    }
    const article: Article = await response.json();
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function getArticleCount(): Promise<number> {
  try {
    // Since dev.to API doesn't provide total count, we estimate based on recent articles
    const response = await fetch(`${BASE_URL}?per_page=1000`);
    if (!response.ok) {
      return 1000; // Default estimate
    }
    const articles: Article[] = await response.json();
    return articles.length;
  } catch (error) {
    console.error("Error getting article count:", error);
    return 1000; // Default estimate
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
