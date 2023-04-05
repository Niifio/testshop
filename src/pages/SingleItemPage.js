import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { MdAddLocationAlt } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import seller from "../images/seller.png";
import phone from "../images/phone.png";
import heroImage from "../images/select.png";

function SingleItemPage() {
  const { data } = useSelector((state) => state.shop);
  const { id } = useParams();
  const [item, setItem] = useState([]);
  useEffect(() => {
    const singleItem = data.filter((el) => el.id == id);
    if (singleItem.length)
      localStorage.setItem("select", JSON.stringify(singleItem));
  }, []);

  const [currentImage, setCurrentImage] = useState(0);
  const previousImage = (images) => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const nextImage = (images) => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  useEffect(() => {
    let selected = JSON.parse(localStorage.getItem("select"));
    setItem(selected);
  }, []);

  return (
    <section className="bg-white flex flex-col items-center  w-screen  md:mt-20 justify-center">
      <div className="flex w-full md:flex-row md:w-4/5 md:space-x-8">
        <div
          id="hero"
          className="flex items-center justify-center w-full mt-32 md:mt-10 md:h-[22.799rem] space-x-10 bg-blueIshGray"
        >
          <div
            id="info"
            className="flex flex-col w-full h-full p-2 md:w-1/2   space-y-10 items-center justify-center "
          >
            <div
              id="header"
              className="flex flex-col w-full  items-center justify-center"
            >
              <p className="font-Montserrat font-normal text-[2.063rem] leading-[2.514rem]">
                Buy & Sell anything in your <br />
              </p>
              <p className="font-Montserrat font-normal text-[2.063rem] leading-[2.514rem]">
                University Campus
              </p>
            </div>
          </div>
          <div id="hero-image" className="hidden mt-32 md:block ">
            <img id="heroImage" src={heroImage} alt="" />
          </div>
        </div>
      </div>
      {/* Carousel */}
      <div
        id="item-container"
        className="flex flex-col w-full mt-36 mb-20 bg-[#FAFBFC]  py-8 md:w-4/5 "
      >
        <div id="item-checkout" className="flex  w-full ">
          {item.map((el) => {
            const { id, category, price, images, description, creationAt } = el;
            return (
              <div
                key={id}
                className=" flex w-full items-center justify-center space-x-4 "
              >
                <div
                  id="item-carousel"
                  className="flex flex-col relative w-1/2"
                >
                  <div className="flex h-[35rem]">
                    <img
                      src={images[currentImage]}
                      alt=""
                      className="flex-1 w-full"
                    />
                  </div>
                  <div className="absolute w-full h-full">
                    <div className="flex w-full h-full items-center justify-between">
                      <button
                        className=""
                        onClick={() => previousImage(images)}
                      >
                        <FaAngleLeft className="text-8xl text-darkIshGray" />
                      </button>
                      <button className="" onClick={() => nextImage(images)}>
                        <FaAngleRight className="text-8xl text-darkIshGray" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-8 mt-2 cursor-pointer">
                    {Array.from({ length: 3 }).map((el, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            currentImage === index
                              ? "w-[14.33px] h-[14.33px] rounded-full bg-[#FFBA83] z-10"
                              : "w-[14.33px] h-[14.33px] rounded-full bg-[#FFBA83BF] z-10"
                          }
                          onClick={() => setCurrentImage(index)}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                {/* info */}
                <div id="item-info" className=" h-full w-1/2 px-8">
                  <button className="rounded-lg bg-brightRed px-2 text-sm text-white">
                    {id % 2 == 0 ? "New" : "Used"}
                  </button>
                  <h2 className="text-2xl font-semibold font-Manrope py-4">
                    {category.name}
                  </h2>
                  <p className="text-4xl text-brightRed py-2 mb-4 font-Manrope">{`${price}\u058F`}</p>
                  <p className="text-xs mb-4 py-4 text-[#50CC98] font-Manrope">
                    {creationAt.slice(0, 10)}
                  </p>
                  <div>
                    <h3 className="text-base font-semibold py-2 font-Manrope">
                      Description
                    </h3>
                    <p className="text-sm leading-loose mb-4 font-Manrope">
                      {description}
                    </p>
                  </div>
                  <div>
                    <div className="space-y-4">
                      <p className="font-bold font-Inter">Seller</p>
                      <div className="flex items-center space-x-2">
                        <img src={seller} alt="" />
                        <p className="font-Inter">name</p>
                      </div>
                      <div className="flex items-center ">
                        <p className="text-xl font-Inter">Location</p>
                        <MdAddLocationAlt className="text-2xl text-[#50CC98]" />
                      </div>
                    </div>
                    <button className=" flex items-end justify-end w-full px-16  mt-8 mb-8 text-white text-2xl  font-Inter font-bold">
                      <div className="flex w-[14rem] items-center justify-center space-x-2 rounded-xl py-1 bg-brightRed">
                        <img src={phone} alt="" />
                        <p>Call</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex h-12 pr-4 items-center justify-end space-x-12 mb-20">
          <button className="px-12 py-2 mt-8  text-black text-2xl rounded-xl font-inter font-bold border-2 border-black bg-white">
            Add to cart
          </button>
          <button className="px-12 py-2 mt-8 text-white text-2xl rounded-xl font-inter font-bold bg-brightRed">
            Check out
          </button>
        </div>
      </div>
    </section>
  );
}

export default SingleItemPage;
