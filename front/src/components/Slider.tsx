import React from "react";
import slider1 from "../assets/slider1.jpg";
import slider2 from "../assets/slider2.jpg";
import slider3 from "../assets/slider3.jpg";
import slider4 from "../assets/slider4.jpg";

const Slider = () => {
  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document
      .querySelector(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
  };
  return (
    <div className="flex flex-col justify-center items-center mt-10  ">
      <div className="carousel w-90 md:w-180 lg:w-250 lg:h-140">
        <div id="item1" className="carousel-item w-full   ">
          <img src={slider1} className="w-full " />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src={slider2} className="w-full" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img src={slider3} className="w-full" />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img src={slider4} className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
       <a href="#item1" className="btn btn-xs" onClick={scrollToId("#item1")}>
          1
        </a>
        <a href="#item2" className="btn btn-xs" onClick={scrollToId("#item2")}>
          2
        </a>
        <a href="#item3" className="btn btn-xs" onClick={scrollToId("#item3")}>
          3
        </a>
       <a href="#item4" className="btn btn-xs" onClick={scrollToId("#item4")}>
          4
        </a>
      </div>
    </div>
  );
};

export default Slider;
