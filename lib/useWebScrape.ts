import { useEffect, useState } from "react";

import {WebScrapeData, WebScrapeResponse} from "../types";

export interface UseFetchResult {
  data: WebScrapeData | null;
  error: string | null;
  loading: boolean;
}

const useWebScrape = (url: string): UseFetchResult => {
  const [data, setData] = useState<WebScrapeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url) {
      (async () => {
        try {
          const response = await fetch("http://localhost:3000/api/scrape", {
            body: JSON.stringify({
              url
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST"
          });

          if (response.ok) {
            const webScrapeResponse: WebScrapeResponse = await response.json();

            if (webScrapeResponse.data && !webScrapeResponse.error) {
              setData(webScrapeResponse.data);
            } else {
              setError(webScrapeResponse.error);
            }
          } else {
            setError("Couldn't fetch API");
          }

          setLoading(false);
        } catch (error: unknown) {
          setError(error as string);
          setLoading(false);
        }
      })();
    }
  }, [setData, setError, setLoading, url]);

  return {
    data,
    error,
    loading
  }
}

export default useWebScrape;