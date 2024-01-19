import React, { useEffect } from "react";

const FacebookChat = () => {
  useEffect(() => {
    // Your Chat Plugin code
    const chatbox = document.getElementById("fb-customer-chat");
    chatbox.setAttribute("page_id", "129886600213748");
    chatbox.setAttribute("attribution", "biz_inbox");

    // Your SDK code
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v18.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_GB/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <div>
      {/* Your Chat Plugin code */}
      <div id="fb-customer-chat" className="fb-customerchat"></div>
    </div>
  );
};

export default FacebookChat;
