import React from "react";
import HomeHero from "./components/HomeHero";
import HomeSobre from "./components/HomeSobre";
import HomeServicos from "./components/HomeServicos";

export default function Home() {
  return (
    <>
      <section className="bg-ui-background">
        <HomeHero />
        <HomeSobre />
        <HomeServicos />
      </section>
    </>
  );
}
