import Head from "next/head";
import React from "react";

interface ISeoprops {
  title: string;
}

export default function Seo({ title }: ISeoprops) {
  return (
    <Head>
      <title>{title} | Nextron Talk</title>
    </Head>
  );
}
