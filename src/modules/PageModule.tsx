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

    {/* <!-- Messenger Chat Plugin Code --> */}
    <div id="fb-root"></div>

    {/* <!-- Your Chat Plugin code --> */}
    <div id="fb-customer-chat" class="fb-customerchat"></div>

        <Script
          id="messenger-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `var chatbox = document.getElementById('fb-customer-chat');
                     chatbox.setAttribute("page_id", "129886600213748");
                     chatbox.setAttribute("attribution", "biz_inbox");`,
          }}
        ></Script
             
    {/* <!-- Your SDK code --> */}
        <Script
          id="messenger-sdk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v18.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_GB/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));`,
          }}
        ></Script      
      {children}
    </main>
  );
};

export default PageModule;
