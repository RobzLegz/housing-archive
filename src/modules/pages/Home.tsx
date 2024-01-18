import React from "react";
import Landing from "../../components/home/Landing";
import PageModule from "../PageModule";

const Home = () => {
  return (
    <PageModule description="Īpašumu meklēšanas dzinējs">
      <Landing />
      <Facebook />
    </PageModule>
  );
};

export default Home;
