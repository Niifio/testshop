import React from "react";
import { useRouteError } from "react-router";
import errorImg from "../images/wrong.png";
function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-row-reverse ">
        <img src={errorImg} alt="" />
        <div>
          <p className="text-4xl">Sorry!</p>
          <i className="text-4xl">{error.statusText || error.message}</i>
          <p className="text-4xl">Return to home page!</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
