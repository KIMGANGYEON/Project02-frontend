import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Helmet } from "react-helmet";
import splitting from "splitting";

// IMG
import img2 from "../../img/project01/2.jpg";
import clo01 from "../../img/project01/clo01.jpg";
import clo02 from "../../img/project01/clo02.jpg";
import clo03 from "../../img/project01/clo03.jpg";
import clo04 from "../../img/project01/clo04.jpg";
import clo05 from "../../img/project01/clo05.jpg";
import clo06 from "../../img/project01/clo06.jpg";
import clo07 from "../../img/project01/clo07.jpg";
import clo08 from "../../img/project01/clo08.jpg";
import clo09 from "../../img/project01/clo09.jpg";
import clo10 from "../../img/project01/clo10.jpg";
import clo11 from "../../img/project01/clo11.jpg";
import clo12 from "../../img/project01/clo12.jpg";
import clo13 from "../../img/project01/clo13.jpg";
import clo14 from "../../img/project01/clo14.jpg";
import clo15 from "../../img/project01/clo15.jpg";
import clo16 from "../../img/project01/clo16.jpg";
import clo17 from "../../img/project01/clo17.jpg";
import back01 from "../../img/project01/back01.jpg";
import back02 from "../../img/project01/back02.jpg";
import back03 from "../../img/project01/back03.jpg";
import back04 from "../../img/project01/back04.jpg";
import back05 from "../../img/project01/back05.jpg";
import dig01 from "../../img/project01/dig01.jpg";
import dig02 from "../../img/project01/dig02.jpg";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Project01() {
  const [video, setVideo] = useState(true);
  const onClick = () => {
    setTimeout(() => {}, 2000);
    setVideo(false);
  };

  const [text, setText] = useState(1);
  const [center, setCenter] = useState(0);
  const stageWidth = document.querySelector(".imgBox");
  const goLeft = () => {
    if (center > -100) {
      return;
    } else {
      setText((prev) => prev - 1);
      setCenter((prev) => prev + 100);
    }
  };
  const goRight = () => {
    if (text > 4) {
      return;
    } else {
      setText((prev) => prev + 1);
      setCenter((prev) => prev - 100);
    }
  };

  const [slide1, setSlide1] = useState(0);
  const [slide2, setSlide2] = useState(0);
  const [slide3, setSlide3] = useState(0);
  const [slide4, setSlide4] = useState(0);
  const [opacity1, setOpacity1] = useState(0);
  const [opacity2, setOpacity2] = useState(0);
  const [opacity3, setOpacity3] = useState(0);
  const [opacity4, setOpacity4] = useState(1);

  const click1 = () => {
    setOpacity1(1);
    setOpacity2(0);
    setOpacity3(0);
    setOpacity4(0);
    setSlide1(0);
    setSlide2(59);
    setSlide3(59);
    setSlide4(59);
  };
  const click2 = () => {
    setOpacity1(0);
    setOpacity2(1);
    setOpacity3(0);
    setOpacity4(0);
    setSlide1(0);
    setSlide2(0);
    setSlide3(59);
    setSlide4(59);
  };
  const click3 = () => {
    setOpacity1(0);
    setOpacity2(0);
    setOpacity3(1);
    setOpacity4(0);
    setSlide1(0);
    setSlide2(0);
    setSlide3(0);
    setSlide4(59);
  };
  const click4 = () => {
    setOpacity1(0);
    setOpacity2(0);
    setOpacity3(0);
    setOpacity4(1);
    setSlide1(0);
    setSlide2(0);
    setSlide3(0);
    setSlide4(0);
  };

  useEffect(() => {
    splitting({ target: ".womens" });
    splitting({ target: ".mens" });
    splitting({ target: ".bags" });
    splitting({ target: ".gifts" });
  }, [onClick]);

  return (
    <>
      <Helmet>
        <title>Project01</title>
      </Helmet>
      <div className="Project01">
        {video ? (
          <div className="videoBox">
            <video controls autoPlay muted>
              <source src="/videos/prada.mp4" type="video/mp4" />
            </video>
            <button onClick={onClick}>Skip</button>
          </div>
        ) : (
          <div className="main">
            <div className="header">
              <div className="top">
                <h1>PRADA</h1>
                <div className="top__grid">
                  <span>2024 f/w</span>
                  <span>Find Your Own</span>
                </div>
              </div>
              <div className="bottom">FW 2024 Womenswear Look Book</div>
            </div>
            <div className="main__img__box">
              <div className="main__img">
                <img src={img2} />
              </div>
            </div>
            <div className="text__box">
              <p>PRADA 2024 FW</p>
              <h2>
                Fashion, far from being confined to fleeting trends, is an
                enduring manifestation of grace and elegance, a timeless
                testament to the artistry and innovation of the human spirit.
              </h2>
            </div>
            <div className="main__img__box2">
              <div className="img__box">
                <img src={clo01} alt="" />
                <img src={clo02} alt="" />
              </div>
              <div className="img__box2">
                <img src={clo03} alt="" />
                <p>
                  Modernity is not a rejection of tradition but rather a
                  celebration of diversity, an acknowledgment of the myriad
                  voices and perspectives that contribute to the rich tapestry
                  of contemporary culture.v
                </p>
              </div>
            </div>
            <div className="main__img__box3">
              <h1>Simplicity is the ultimate sophistication</h1>

              <div className="img__box">
                <img src={clo04} alt="" />
                <img src={clo05} alt="" />
              </div>
              <div className="img__box">
                <img src={clo06} alt="" />
                <img src={clo07} alt="" />
              </div>
              <div className="img__box">
                <img src={clo08} alt="" />
                <img src={clo09} alt="" />
              </div>
              <div className="img__box">
                <img src={clo10} alt="" />
                <img src={clo11} alt="" />
              </div>
              <div className="img__box">
                <img src={clo12} alt="" />
                <img src={clo13} alt="" />
              </div>
            </div>
            <div className="backStage">
              <div className="stage">stage</div>
              <div
                className="imgBox"
                style={{ transform: `translateX(${center}vw)` }}
              >
                <div className="imgWidth">
                  <img src={back01} alt="" />
                </div>
                <div className="imgWidth">
                  <img src={back02} alt="" />
                </div>
                <div className="imgWidth">
                  <img src={back03} alt="" />
                </div>
                <div className="imgWidth">
                  <img src={back04} alt="" />
                </div>
                <div className="imgWidth">
                  <img src={back05} alt="" />
                </div>
              </div>
              <div className="btn-box">
                <button onClick={goLeft}>←</button>
                <h1>
                  <span>0{text} </span>/ 05
                </h1>
                <button onClick={goRight}>→</button>
              </div>
            </div>
            <div className="lookBook">
              <div
                className="slideBox"
                onClick={click1}
                style={{ transform: `translateX(${slide1}vw)` }}
              >
                <div className="text">
                  <h1>Look Book &nbsp;1</h1>
                </div>
                <div className="imgSet" style={{ opacity: opacity1 }}>
                  <img src={clo14} alt="" />
                  <h3>Look 1</h3>
                </div>
              </div>
              <div
                className="slideBox"
                onClick={click2}
                style={{ transform: `translateX(${slide2}vw)` }}
              >
                <div className="text">
                  <h1>Look Book 2</h1>
                </div>
                <div className="imgSet" style={{ opacity: opacity2 }}>
                  <img src={clo15} alt="" />
                  <h3>Look 2</h3>
                </div>
              </div>
              <div
                className="slideBox"
                onClick={click3}
                style={{ transform: `translateX(${slide3}vw)` }}
              >
                <div className="text">
                  <h1>Look Book 3</h1>
                </div>
                <div className="imgSet" style={{ opacity: opacity3 }}>
                  <img src={clo16} alt="" />
                  <h3>Look 3</h3>
                </div>
              </div>
              <div
                className="slideBox"
                onClick={click4}
                style={{ transform: `translateX(${slide4}vw)` }}
              >
                <div className="text">
                  <h1>Look Book 4</h1>
                </div>
                <div className="imgSet" style={{ opacity: opacity4 }}>
                  <img src={clo17} alt="" />
                  <h3>Look 4</h3>
                </div>
              </div>
            </div>
            <div className="goShop">
              <div>
                <a
                  href="https://www.prada.com/kr/ko/womens/ready-to-wear/c/10048KR"
                  target="_blank"
                >
                  <h1 className="womens">Womens &rarr;</h1>
                </a>
              </div>
              <div>
                <a
                  href="https://www.prada.com/kr/ko/mens/ready-to-wear/c/10130KR"
                  target="_blank"
                >
                  <h1 className="mens">Mens &rarr;</h1>
                </a>
              </div>
              <div>
                <a
                  href="https://www.prada.com/kr/ko/womens/essentials/c/10100KR"
                  target="_blank"
                >
                  <h1 className="bags">Bags &rarr;</h1>
                </a>
              </div>
              <div>
                <a
                  href="https://www.prada.com/kr/ko/womens/gifts/c/10108KR"
                  target="_blank"
                >
                  <h1 className="gifts">Gifts &rarr;</h1>
                </a>
              </div>
            </div>
            <div className="designed">
              <div className="right">
                <h1>prada</h1>
                <h1>prada 2024 fw womenwear</h1>
              </div>
              <div className="left">
                <h1>designed by</h1>
                <div className="footer">
                  <h2>raf simons</h2>
                  <h2>Muccia Prada Bianchi</h2>
                </div>
                <div className="imgBox">
                  <img src={dig01} alt="" />
                  <img src={dig02} alt="" />
                </div>
              </div>
            </div>
            <div className="lastSection">
              <div className="video__grid">
                <video autoPlay muted loop>
                  <source src="/videos/prada3.mp4" type="video/mp4" />
                </video>
                <video autoPlay muted loop>
                  <source src="/videos/prada2.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="text">
                <h1>
                  A knowledge of history not only informs the contemporaneous,
                  but defines it – clothes are referent to different eras, other
                  times, synchronous echoes recontextualized. The past is an
                  instrument, a tool for learning, used here to try to invent
                  something new. Yet rather than an intellectual examination,
                  this collection is an emotional reaction, to ideals of beauty
                  that still feel resonant.
                </h1>
              </div>
              <div className="lastVideo">
                <video autoPlay muted loop>
                  <source src="/videos/prada4.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Project01;
