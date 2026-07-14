import React from "react";
import logo from "../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuthStore } from "../stores/auth.store";
import Button from "./ui/button";
import api from "../api/axios.instance";

interface INavProps {
  id: number | undefined;
  role: string | undefined
}
const PrivateNavbar = ({ id, role }: INavProps) => {

  const navigate = useNavigate()
  const logOut = async () => {
    try {
      console.log('déconnexion');
      await api.post("http://localhost:3000/auth/logout");
      useAuthStore.getState().logout()
      navigate('/')
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }

  }
  return (
    <div className="navbar bg-black  w-full ">
      <div className="navbar-start">

      </div>
      <div className="navbar-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-25  w-50 " />
        </Link>
      </div>
      <div className="navbar-end lg:gap-5 ">
        <Link to={`/profile/${id}`} className="btn btn-ghost btn-circle ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              cx="12"
              cy="8"
              r="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
            />
          </svg>
        </Link>

        <button className="btn btn-ghost btn-circle" onClick={() => logOut()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PrivateNavbar;
