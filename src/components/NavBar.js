import React, { useState, useEffect } from "react";
import { Link, useMatches, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import user from "../images/user.png";
import addIcon from "../images/add.png";
function NavBar() {
  const [named, setNamed] = useState("");
  const matches = useMatches();
  const { login } = useSelector((state) => state.auth);
  const { name, email, id } = login;
  const navigate = useNavigate();
  let pathName = matches[1].pathname;

  const logout = () => {
    navigate("/");
  };

  // useEffect(() => {
  //   if (login.length) {
  //     let name = login.name;
  //     localStorage.setItem("name", JSON.stringify(name));
  //   }
  // }, []);
  // useEffect(() => {
  //   let loginName = JSON.parse(localStorage.getItem("name"));
  //   setNamed(loginName);
  // }, []);
  return (
    <>
      <nav className="flex align-center justify-center h-[7.75rem] fixed top-0 left-0 right-0 z-50 style">
        <div className="flex flex-row px-1 align-center justify-between w-[67.188rem]">
          <h2 className="text-lightBlue my-auto text-4xl font-Poppins font-bold">
            Online-Shop
          </h2>
          <div className="hidden w-[19.438rem] my-auto md:block">
            <div className="flex w-full justify-between">
              <div className="flex items-center justify-center">
                <Link
                  to={
                    pathName === "/" || pathName === "/register"
                      ? ""
                      : `/home/profile/${id}`
                  }
                >
                  <img src={user} alt="userimage" />
                </Link>
                {pathName == "/" || pathName === "/register" ? (
                  <>
                    <Link
                      to="/register"
                      className={
                        pathName === "/register"
                          ? "text-lg font-Poppins underline underline-offset-8 decoration-4 decoration-brightRed"
                          : "text-lg font-Poppins"
                      }
                    >
                      Register
                    </Link>
                    /
                    <Link
                      to="/"
                      className={
                        pathName === "/"
                          ? "text-lg font-Poppins underline underline-offset-8 decoration-4 decoration-brightRed"
                          : "text-lg font-Poppins"
                      }
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <div className="flex space-x-4">
                    <p className="text-lg font-Poppins">{name}</p>
                    <div
                      className="text-lg font-Poppins text-brightRed pr-8"
                      onClick={logout}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center">
                <Link>
                  <img src={addIcon} alt="" />
                </Link>
                <Link>
                  <p className="text-lg font-Poppins">Sell</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

// background: linear-gradient(1.02deg, #FC0B0D -17.21%, rgba(74, 153, 211, 0) 75.91%), #FFFFFF;

// h-[7.75rem]
