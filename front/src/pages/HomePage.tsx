import React from "react";
import Caroussel from "../components/Caroussel";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router";
import Button from "../components/ui/button";
import TornEdge from "../components/TornEdge";

const HomePage = () => {
  return (
    <div className="flex flex-col  items-center  ">
      <Caroussel />

      <div className="relative w-full -translate-y-10 ">
        <TornEdge position="top"/>
        <div className="  bg-black lg:h-130 h-190 lg:px-16 flex flex-col justify-center items-center lg:items-baseline pt-20 lg:flex-row-reverse gap-5 lg:justify-evenly">
          <Fade direction="down" delay={500} >
            <div className="flex flex-col">
              <h1 className="text-5xl text-festify-red font-metal">Login now !</h1>
              <p className="py-6 lg:text-xl w-90 lg:w-110">
                <span className="lg:text-2xl text-xl">
                  Fais vibrer ton festival avec Festify !{" "}
                </span>
                <br />
                De l'organisation millimétrée au bénévolat sur le terrain,
                rejoins les rangs de ceux qui font vibrer la terre. Festify te
                donne les clés : parce qu'on n'a pas besoin d'être sous les
                projecteurs pour faire briller la scène !
              </p>
            </div>
            <div className=" w-50 p-4 h-100  ">
              <form className="flex flex-col gap-6  lg:w-100 ">
                {/* Input Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-zinc-300 text-xs tracking-widest uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="ton@email.com"
                    className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors"
                  />
                </div>
                {/* Input Mot de passe */}
                <div className="flex flex-col gap-1">
                  <label className="text-zinc-300 text-xs tracking-widest uppercase">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors"
                  />
                </div>
                <a className="text-zinc-600 text-xs hover:text-red-700 transition-colors cursor-pointer self-start">
                  Mot de passe oublié ?
                </a>
                {/* Bouton principal */}
                <Button textButton="SE CONNECTER"/>
                {/* Bouton secondaire */}
                <Link
                  to="/register"
                  className="w-full border border-zinc-700 hover:border-red-700 text-zinc-400 hover:text-red-500 py-3 text-sm font-bold tracking-widest uppercase text-center transition-colors"
                >
                  S'inscrire
                </Link>
              </form>
            </div>
          </Fade>
        </div>

        <TornEdge position="bottom"/>
      </div>
    </div>
  );
};

export default HomePage;
