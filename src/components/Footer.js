import React from "react";

function Footer() {
  return (
    <>
      <div className=" bg-blueIshGray">
        <div className="flex flex-col space-y-6 md:flex-row  md:items-center md:justify-center md:space-x-60">
          <div className="flex flex-col p-4 md:w-2/5">
            <h1 className="font-Inter text-5xl mb-4">Online-Shop</h1>
            <p className="font-Montserrat text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit
              malesuada dapibus ut pulvinar neque arcu, commodo. Pharetra nisi
              egestas nisi fermentum. Sollicitudin egestas senectus pellentesque
              enim mauris vel odio commodo. Pellentesque orci vestibulum sed in
              molestie consequat.
            </p>
          </div>
          <div className="flex flex-row px-4 space-x-6 mb-6 ">
            <div className="font-Montserrat text-lg leading-10">
              <h3 className="text-2xl mb-4">Contact Us</h3>
              <p>+255 752 186 174</p>
              <p>lisajocktan@gmail.com</p>
              <p>Kijitonyama</p>
            </div>
            <div className="font-Montserrat text-lg leading-10">
              <h3 className="text-2xl mb-4">About Us</h3>
              <p>Support</p>
              <p>Privacy and Policy</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
