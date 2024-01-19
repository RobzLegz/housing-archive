import Head from "next/head";
import React from "react";
import { PageComponent } from "../types/pageComponent";

interface PageModuleProps {
  title?: string;
  description: string;
  children?: React.ReactNode;
}

const PageModule: PageComponent<PageModuleProps> = ({
  title = "",
  description,
  children,
}) => {
  return (
    <main>
      <Head>
        <title>{`Īpašumu arhīvs${title ? ` | ${title}` : ""}`}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </main>
  );
};

export default PageModule;
