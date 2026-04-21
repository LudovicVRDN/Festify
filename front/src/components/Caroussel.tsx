import React, { useEffect, useState } from "react";
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo6 from "../assets/photo6.jpg";

const Caroussel = () => {
  interface IPicture {
    id: number;
    src: string;
    alt: string;
  }
  const pictures: IPicture[] = [
    {
      id: 1,
      src: photo1,
      alt: "Festival stage",
    },
    {
      id: 2,
      src: photo2,
      alt: "Flames stage",
    },
    {
      id: 3,
      src: photo3,
      alt: "Singer on stage",
    },
    {
      id: 4,
      src: photo4,
      alt: "Drums",
    },
    {
      id: 5,
      src: photo5,
      alt: "Singer silhouette",
    },
    {
      id: 6,
      src: photo6,
      alt: "Final Show pictures",
    },
  ];
  const totalPic: number = pictures.length;
  const [currentPic, setPicture] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = currentPic === totalPic-1 ? 1 : currentPic + 1;
      setPicture(nextIndex);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentPic]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="carousel w-full ">
          <div id="picture.id" className="carousel-item w-225 h-130   ">
            <img
              src={pictures[currentPic].src}
              alt={pictures[currentPic].alt}
              className="rounded-3xl w-200 h-120 m-auto "
            />
          </div>
   
      </div>
    </div>
  );
};

export default Caroussel;
