import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { useAuthStore } from "../stores/auth.store";

interface INavProps{
  id : number | undefined
}
const Navbar = ({id} : INavProps) => {
  
  return (
    <div className="navbar bg-black  w-full ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-50 p-2 shadow "
          >
            <li>
              <a className="text-lg">Festivals</a>
            </li>
            <li>
              <a className="text-lg">Festify</a>
            </li>
          </ul>
        </div>
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
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />{" "}
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
