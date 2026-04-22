import React from "react";
import Caroussel from "../../components/Caroussel";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router";
import Button from "../../components/ui/button";

const LoginPage = () => {
 
  return (
    <div className="flex flex-col lg:flex-row  items-center ">
      <Fade direction="left" delay={500}>
        <div className="flex flex-col justify-center items-center lg:min-h-150 m-auto ">
          <div className="hero-content bg-black flex-col-reverse  lg:h-155 rounded-tr-3xl rounded-bl-3xl border border-red-950 flex justify-center items-center gap-5 w-[95%] ">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl  text-red-900 font-metal ">
                Login now !
              </h1>
              <p className="py-6 lg:text-xl">
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
            <div className="card bg-neutral-800 lg:w-[80%] w-[80%] max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input type="email" className="input" placeholder="Email" />
                  <label className="label">Mot de passe</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Mot de passe"
                  />
                  <div>
                    <a className="link link-hover">Mot de passe oublié ?</a>
                  </div>
                 <Button textButton={"Se connecter"}/> 
                  <Link to="/register" 
                  className="btn btn-neutral bg-red-900 mt-4">
                    S'inscrire
                  </Link>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </Fade>
      <Fade direction="right" delay={500}>
        <Caroussel />
      </Fade>
    </div>
  );
};

export default LoginPage;
