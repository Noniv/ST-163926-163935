import type { NextApiRequest, NextApiResponse } from "next";

import * as cheerio from "cheerio";
import Vibrant from "node-vibrant";
import type { Palette } from "@vibrant/color";

import type { Count, WebScrapeData, WebScrapeResponse } from "../../types";

const handler = async (request: NextApiRequest, response: NextApiResponse<WebScrapeResponse>) => {
  if (request.method === "POST") {
    try {
      const url = request.body.url;
      const fetchResponse = await fetch(url);
      const html = await fetchResponse.text();

      if (!html.length) {
        response.status(400).json({ data: null, error: "Empty HTML" });
      }

      const $ = cheerio.load(html);

      const image = $("meta[property=og:image]", "head").attr("content");
      let palette: Palette | undefined;

      try {
        palette = image ? await Vibrant.from(image).getPalette() : undefined;
      } catch (error) {
        palette = undefined;
      }

      const text: string[] = [];
      const words: string[] = [];

      let letterCount: Count[] = [];
      let wordCount: Count[] = [];

      const content = $("body *:not(noscript):not(script):not(style)")
        .contents()
        .toArray()
        .filter((element) => element.type === "text")
        .map((element) => $(element).text().trim())
        .filter((text) => text !== "")
        .forEach((line) => {
          line.split(" ").forEach((word) => text.push(word));
        });

      text.forEach((word) => {
        const matches = word.match(/[\p{L}’']+/gu);

        if (matches) {
          matches.forEach((match) => words.push(match));
        }
      });

      words.forEach((word) => {
        const foundIndex = wordCount.findIndex((element) => element.value === word);

        if (foundIndex !== -1) {
          wordCount[foundIndex].count++;
        } else {
          wordCount.push({
            count: 1,
            value: word,
          });
        }

        word.split("").forEach((letter) => {
          const lowercaseLetter = letter.toLowerCase();

          if (lowercaseLetter.match(/[\p{L}]/gu)) {
            const foundIndex = letterCount.findIndex((element) => element.value === lowercaseLetter);

            if (foundIndex !== -1) {
              letterCount[foundIndex].count++;
            } else {
              letterCount.push({
                count: 1,
                value: lowercaseLetter,
              });
            }
          }
        });
      });

      const data: WebScrapeData = {
        image,
        letterCount: letterCount.sort((a, b) => (a.count > b.count ? -1 : 1)),
        palette,
        title: $("title", "head").text(),
        wordCount: wordCount.sort((a, b) => (a.count > b.count ? -1 : 1)),
        words,
      };

      response.status(200).json({ data, error: null });
    } catch (error) {
      console.error(error);
      response.status(500).json({ data: null, error: "" });
    }
  } else {
    response.status(405).json({ data: null, error: "Method Not Allowed" });
  }
};

export default handler;
