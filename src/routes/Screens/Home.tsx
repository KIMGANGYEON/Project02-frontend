import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import ProjectScreens from "./ProjectScreens";

const Home = () => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [moveUp, setMoveUp] = useState(0);
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const spans = textRef.current.querySelectorAll("span");
      spans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add("moveUpDown");
        }, index * 100);
      });
    }
  }, []);

  const handleClick = () => {
    setMoveUp(-111);
    setTimeout(() => {
      setShowHome(true);
    }, 2000);
  };
  return (
    <section className="home">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div
        className="home_welcome"
        style={{ transform: `translateY(${moveUp}%)` }}
      >
        <div className="grid_screen" style={{ backgroundColor: "red" }}></div>
        <div
          className="grid_screen"
          style={{ backgroundColor: "orange" }}
        ></div>
        <div
          className="grid_screen"
          style={{ backgroundColor: "yellow" }}
        ></div>
        <div className="grid_screen" style={{ backgroundColor: "green" }}></div>
        <div className="grid_screen" style={{ backgroundColor: "blue" }}></div>
        <div className="grid_screen" style={{ backgroundColor: "navy" }}></div>
        <div
          className="grid_screen"
          style={{ backgroundColor: "purple" }}
        ></div>

        <div className="welcome_text" ref={textRef}>
          <span>w</span>
          <span>e</span>
          <span>l</span>
          <span>c</span>
          <span>o</span>
          <span>m</span>
          <span style={{ marginRight: 25 }}>e</span>
          <span>n</span>
          <span>e</span>
          <span style={{ marginRight: 25 }}>w</span>
          <span>w</span>
          <span>o</span>
          <span>r</span>
          <span>d</span>
          <button style={{ fontSize: 30 }} onClick={handleClick}>
            Enter
          </button>
        </div>
      </div>
      {showHome && <ProjectScreens />}
      {/* <ProjectScreens /> */}
    </section>
  );
};

export default Home;
