import React from "react";
import MessengerCustomerChat from 'react-messenger-customer-chat';

const FBMessengerWidget = () => {
  return (
    <div className="z-50">
      <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        htmlRef="<REF_STRING>"
      />
    </div>
  );
};

export default FBMessengerWidget;
