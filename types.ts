import type * as cheerio from "cheerio";

export interface Count {
  count: number;
  value: string;
}

export interface WebScrapeData {
  image?: string;
  letterCount?: Count[];
  title?: string;
  wordCount?: Count[];
  words?: string[];
}

export interface WebScrapeResponse {
  data: WebScrapeData | null;
  error: string | null;
} 