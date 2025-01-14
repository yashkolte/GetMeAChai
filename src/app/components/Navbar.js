"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {RainbowButton} from "@/components/ui/RainbowButton";
import InteractiveHoverButton from "@/components/ui/InteractiveHoverButton";

const Navbar = () => {
  const [showdropdown, setShowdropdown] = useState(false);
  const { data: session } = useSession();
  // console.log("session ", session?.user.username)
  // if(session) {
  //   return <>
  //     Signed in as {session.user.name} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }

  return (
<<<<<<< HEAD
    <nav className="fixed top-0 w-full text-white flex justify-between items-center px-4 py-4 md:h-16 flex-row z-30 backdrop-blur-sm backdrop-filter">
=======
    <nav className="fixed top-0 w-full text-white flex justify-between items-center md:px-4 px-6 py-4 md:h-16 flex-row md:flex-row z-30 backdrop-blur-sm backdrop-filter">
>>>>>>> 016d0c568eb13f017d491369308d6e8f1a6e7cb8
      <Link
        href={"/"}
        className="logo font-bold flex items-center justify-center"
      >
        <img src="icons/tea.gif" width={44} alt="" />
        <span className="md:text-xl text-2xl pt-2">GetMeAChai!</span>
      </Link>

      <div className="relative">
        {/* {session && <span className='mx-4'><img src={session.user.image} width="20" alt='User avatar'/>{session.user.name}</span>} */}
        {/* {session && <div className='flex items-center gap-2 mx-4'>
          <img src={session.user.image} width="20" alt="User Image" />
          <span>{session.user.email || session.user.name}</span>
        </div>} */}

        {session && (
          <>
            <RainbowButton
              id="dropdownDefaultButton"
              onClick={() => {
                setShowdropdown(!showdropdown);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setShowdropdown(false);
                }, 100);
              }}
              data-dropdown-toggle="dropdown"
              className=" text-white mx-4 font-medium rounded-lg text-sm p-3 text-center inline-flex items-center"
              type="button"
            >
              Welcome {session.user.username}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
              </RainbowButton>
            <div
              id="dropdown"
              className={`z-10 absolute left-5 border-2 border-gray-600 bg-black divide-y divide-gray-100 rounded-lg shadow w-44 transition-all duration-300 overflow-hidden ${
                showdropdown ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul
                className="py-2 text-sm text-gray-100 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.username}`}
                    className="block px-4 py-2 hover:bg-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={() => {
                      signOut();
                    }}
                    className="block px-4 py-2 hover:bg-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {session && (
          <InteractiveHoverButton text="Logout"
            className="dark text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              signOut();
            }}
          >
            </InteractiveHoverButton>
        )}
        {!session && (
          <Link href={"/login"}>
            <RainbowButton className="bg-white">Login</RainbowButton>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
