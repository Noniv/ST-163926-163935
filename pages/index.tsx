import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Input from "../components/Input";
import useWebScrape from "../lib/useWebScrape";
import styles from "../styles/Home.module.css";
import Options from "../components/Options";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Results from "../components/Results";

import * as cheerio from "cheerio";

const Home: NextPage = () => {
  const [url, setUrl] = useState("");

  const { data, error, loading } = useWebScrape("https://nextjs.org/");

  useEffect(() => {
    console.log(data, error, loading);

    if (data && data.html) {
      const $ = cheerio.load(data.html);

      const words: string[] = [];

      const nodes = Array.from($("*:not(script)", "body").contents());

      nodes.forEach((node) => {
        if (node.type === "text") {
          const text = $(node).text();
          const textWords = text.match(/\b(\w\w*)\b/g);

          if (!textWords) {
            return;
          }

          textWords.forEach((word) => {
            if (!word.match(/[^A-Za-z]|\W|\d/g)) {
              words.push(word);
            }
          });
        }
      });
  
      console.log(words);
    }
  }, [data, error, loading]);

  const handleClick = () => {
    console.log(url);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>ST 163926 163935</title>
      </Head>
      <Header />
      <Input onChange={(event) => setUrl(event.target.value)} value={url} />
      <Options />
      <Button onClick={handleClick} />
      <Results />
      <Footer />
    </div>
  );
};

export default Home;
