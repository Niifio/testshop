import React from "react";
import notfound from "../images/wrong.png";
function NotFound({ sentence }) {
  return (
    <div className="flex flex-col items-center  w-[900px] space-y-8">
      <p className="text-4xl w-1/2">{sentence}</p>
      <div>
        <img src={notfound} alt="notfoundimage" />
      </div>
    </div>
  );
}

export default NotFound;
