import type * as cheerio from "cheerio";
import type { Palette } from "@vibrant/color";

export interface Count {
  count: number;
  value: string;
}

export interface WebScrapeData {
  image?: string;
  letterCount?: Count[];
  palette?: Palette;
  title?: string;
  wordCount?: Count[];
  words?: string[];
}

export interface WebScrapeResponse {
  data: WebScrapeData | null;
  error: string | null;
} 