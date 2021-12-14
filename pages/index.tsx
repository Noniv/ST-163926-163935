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
import Result from "../components/Result"

import * as cheerio from "cheerio";

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [option, setOption] = useState(0);
  const [url, setUrl] = useState("");

  const { data, error, loading } = useWebScrape(url);

  const handleClick = () => {
    setUrl(input);
  };

  useEffect(() => {
    if (data?.image) {
      document.body.style.backgroundImage = `url(${data.image})`;
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>ST 163926 163935</title>
      </Head>
      <Header />
      <Input onChange={(event) => setInput(event.target.value)} value={input} />
      <Options onChange={(event) => setOption(parseInt(event.target.value))} value={option} />
      <Button onClick={handleClick} />
      {data?.letterCount && option === 0 && <Result count={data.letterCount} image={data.image} title="Ilość wystąpień liter" palette={data.palette} url={url} />}
      {data?.wordCount && option === 1 && <Result count={data.wordCount} image={data.image} title="Ilość wystąpień słów" palette={data.palette} url={url} />}
      <Footer />
    </div>
  );
};

export default Home;
