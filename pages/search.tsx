import { ReactElement } from "react";
import Header from "@/components/sections/Header";
import Head from "next/head";

function Search(): ReactElement {
  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>
      <Header />
    </>
  );
}

export default Search;
