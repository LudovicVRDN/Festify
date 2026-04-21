import React from "react";
import Caroussel from "../../components/Caroussel";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex justify-center min-h-150 pt-15 ">
        <div 
        style={{ clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)" }}
        className="hero-content bg-black  flex-col lg:flex-row-reverse h-120 rounded-tr-3xl rounded-bl-3xl border flex justify-center items-center gap-5 "
        >
          <div className="text-center lg:text-left">
            <h1 className="text-5xl text-red-900 font-metal ">Login now !</h1>
            <p className="py-6 lg:text-xl">
              <span className="text-2xl">
                Fais vibrer ton festival avec Festify !{" "}
              </span>
              <br />
              De l'organisation millimétrée au bénévolat sur le terrain, rejoins
              les rangs de ceux qui font vibrer la terre. Festify te donne les
              clés : parce qu'on n'a pas besoin d'être sous les projecteurs pour
              faire briller la scène !
            </p>
          </div>
          <div className="card bg-neutral-800  w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral bg-red-900 mt-4">
                  Login
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <Caroussel />
    </div>
  );
};

export default LoginPage;
