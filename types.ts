import type * as cheerio from "cheerio";

export interface WebScrapeData {
  html?: string;
  image?: string;
  length: number;
  title?: string;
  words?: string[];
}

export interface WebScrapeResponse {
  data: WebScrapeData | null;
  error: string | null;
} 