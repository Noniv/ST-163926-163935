import type { NextApiRequest, NextApiResponse } from "next";

import * as cheerio from "cheerio";

import type {WebScrapeData, WebScrapeResponse} from "../../types";

const handler = async (request: NextApiRequest, response: NextApiResponse<WebScrapeResponse>) => {
  if (request.method === 'POST') {
    try {
      const url = request.body.url
      const fetchResponse = await fetch(url);
      const html = await fetchResponse.text();

      if (!html.length) {
        response.status(400).json({ data: null, error: "Empty HTML" });
      }

      const $ = cheerio.load(html);

      const words: string[] = [];

      const data: WebScrapeData = {
        html,
        image: $("meta[property=og:image]", "head").attr("content"),
        length: html.length,
        title: $("title", "head").text(),
        words,
      }

      response.status(200).json({ data, error: null });
    } catch (error) {
      console.error(error);
      response.status(500).json({ data: null, error: "" });
    }
  } else {
    response.status(405).json({ data: null, error: "Method Not Allowed" });
  }
}

export default handler;