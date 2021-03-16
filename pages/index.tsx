import { ReactElement } from "react";
import Head from "next/head";

function HomePage(): ReactElement {
  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>
    </>
  );
}

export default HomePage;
