import { BellIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutInitiate, setHost } from "../redux/actions";

const Navbar = () => {
  const { currentUser, isHost } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [host, setHost] = useState(isHost);
  const handleLogout = () => {
    console.log("log out");
    dispatch(logoutInitiate());
    if (!currentUser) {
      navigate("/login");
    }
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 sticky top-0 w-full">
      <div className="flex align-center items-center flex-shrink-0 text-white mr-6">
        <BellIcon height={30} width={30} />
        <span className="font-semibold text-xl tracking-tight">EventAlert</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/">
            <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Home
            </div>
          </Link>
          <Link to="/bucketList">
            <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Bucket List
            </div>
          </Link>
        </div>

        <div>
          <button
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            onClick={(isHost) => {
              setHost((host)=>!host);
              dispatch(setHost(!isHost));
            }}
          >
            go to {host ? `user mode` : `host mode`}
          </button>

          {currentUser ? (
            <button
              onClick={handleLogout}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                login
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
