export interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  slug: string;
  published_at: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_timestamp: string;
  tag_list: string[] | string | null;

  tags: string;
  body_html: string;
  body_markdown: string;
  user: {
    name: string;
    username: string;
    twitter_username: string | null;
    github_username: string | null;
    user_id: number;
    website_url: string | null;
    profile_image: string;
    profile_image_90: string;
  };
  organization: {
    name: string;
    username: string;
    slug: string;
    profile_image: string;
    profile_image_90: string;
  } | null;
  cover_image: string | null;
  social_image: string;
  canonical_url: string;
  comments_count: number;
  positive_reactions_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  reading_time_minutes: number;
  path: string;
}

export interface ApiResponse {
  articles: Article[];
  total: number;
  page: number;
  per_page: number;
}
