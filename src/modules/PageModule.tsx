import Head from "next/head";
import React from "react";
import { PageComponent } from "../types/pageComponent";
import FBMessengerWidget from "../components/notifications/FBMessengerWidget";
import ChatBot from "../components/notifications/FBChatbot";

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

      <ChatBot />

      {/* <FBMessengerWidget /> */}
    </main>
  );
};

export default PageModule;
