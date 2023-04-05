import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import heroImage from "../images/select.png";
import cartImage from "../images/cart.png";
import serviceImage from "../images/setting.png";
import { shopData } from "../redux/features/shop/shopSlice";
import NotFound from "../components/NotFound";

function HomePage() {
  const { data } = useSelector((state) => state.shop);

  const [params, setParams] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [limit, setLimit] = useState(12);

  const dispatch = useDispatch();

  const getCategory = (e) => {
    setCategory(`&categoryId=${e.target.value}`);
  };
  const getSearch = (e) => {
    if (e.target.value == "clothes") {
      setCategory(`&categoryId=1`);
    } else if (e.target.value == "electronics") {
      setCategory(`&categoryId=2`);
    } else if (e.target.value == "furniture") {
      setCategory(`&categoryId=3`);
    } else if (e.target.value == "shoes") {
      setCategory(`&categoryId=4`);
    } else if (e.target.value == "others") {
      setCategory(`&categoryId=5`);
    } else {
      if (e.target.value === "") {
        setCategory("");
      }
    }
  };

  const getPrice = (e) => {
    if (e.target.value) setPrice(`&price=${e.target.value}`);
  };

  const getMinPrice = (e) => {
    if (e.target.value)
    setPriceMin(`&price_min=${e.target.value}`);
  };
  const getMaxPrice = (e) => {
    if (e.target.value)
    setPriceMax(`&price_max=${e.target.value}`);
  };

  const fetchData = async () => {
    const data = await fetch(
      `https://api.escuelajs.co/api/v1/products/?offset=0&limit=${limit}${params}`
    );
    const result = await data.json();
    dispatch(shopData(result));
  };
  useEffect(() => {
    if (category && priceMin && priceMax) {
      setParams(category + priceMin + priceMax);
    } else if (category && price) {
      setParams(category + price);
    } else if (priceMin && priceMax) {
      setParams(priceMin + priceMax);
    } else if (category) {
      setParams(category);
    } else if (price) {
      setParams(price);
    } else {
      setParams("");
    }
  }, [category, priceMin, priceMax, price]);
  useEffect(() => {
    fetchData();
  }, [params, limit]);
  return (
    <section className="bg-white flex flex-col items-center w-screen  md:mt-20 justify-center">
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
            <div id="search" className="w-full ">
              <input
                type="text"
                name="search"
                placeholder="Search for any product by category"
                className="w-full p-5 text-lg rounded-2xl border-2 border-brightRed"
                onChange={getSearch}
              />
            </div>
          </div>
          <div id="hero-image" className="hidden mt-32 md:block ">
            <img id="heroImage" src={heroImage} alt="" />
          </div>
        </div>
      </div>
      {/* menu */}
      <div
        id="home-menu"
        className="flex flex-col md:space-x-24 md:mt-24 md:w-4/5 md:flex-row"
      >
        <div
          id="cart"
          className="flex flex-col  p-8 justify-center w-full md:space-x-2 md:w-[39.125rem]  md:h-[18.938rem] md:flex-row cardStyle"
        >
          <div
            id="cart-info"
            className="flex flex-col p-4 items-center justify-center"
          >
            <div id="cart-info-content" className=" w-full h-full">
              <h3 className="text-3xl font-Montserrat font-semi-bold mb-4">
                Used & New
              </h3>
              <p className="text-xl font-Montserrat font-light text-black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue
                orci, pretium nibh eget.
              </p>
              <button className="bg-brightRed text-white mt-2 h-12 w-[9.563rem] rounded-lg">
                View More
              </button>
            </div>
          </div>
          <div id="cart-image" className="w-full h-full p-4">
            <img src={cartImage} className="w-full h-full" alt="" />
          </div>
        </div>
        <div
          id="service"
          className="flex flex-col  p-8 justify-center w-full md:space-x-2 md:w-[39.125rem]  md:h-[18.938rem] md:flex-row cardStyle"
        >
          <div
            id="service-info"
            className="flex flex-col p-4 items-center justify-center"
          >
            <div id="service-info-content" className=" w-full h-full">
              <h3 className="text-3xl font-Montserrat font-semi-bold mb-4">
                Used & New
              </h3>
              <p className="text-xl font-Montserrat font-light text-black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue
                orci, pretium nibh eget.
              </p>
              <button className="bg-brightRed text-white mt-2 h-12 w-[9.563rem] rounded-lg">
                View More
              </button>
            </div>
          </div>
          <div id="service-image" className="w-full h-full p-4">
            <img src={serviceImage} className="w-full h-full" alt="" />
          </div>
        </div>
      </div>
      {/* Capsule */}
      <div
        id="capsule"
        className="flex w-8/12 ml-48  mt-20 p-4 mb-0 space-x-2 "
      >
        {category && (
          <div className="flex justify-center items-center space-x-1 rounded-lg px-1 border-2 border-[#ccc]">
            <p>
              {category.slice(12) == 1
                ? "clothes"
                : null || category.slice(12) == 2
                ? "Electronics"
                : null || category.slice(12) == 3
                ? "Furniture"
                : null || category.slice(12) == 4
                ? "shoes"
                : null || category.slice(12) == 5
                ? "otheres"
                : null}
            </p>

            <div onClick={() => setCategory("")}>
              <FaTimes />
            </div>
          </div>
        )}

        {price && (
          <div className="flex justify-center items-center space-x-1 rounded-lg px-1 border-2 border-[#ccc]">
            <p>{`price: ${price.slice(7)}\u058F`}</p>
            <div onClick={() => setPrice("")}>
              <FaTimes />
            </div>
          </div>
        )}

        {priceMin && priceMax && (
          <div className="flex justify-center items-center space-x-1  rounded-lg px-1 border-2 border-[#ccc]">
            <p>{`price: ${priceMin.slice(11)}\u058F-${priceMax.slice(
              11
            )}\u058F`}</p>
            <div
              onClick={() => {
                return setPriceMax(""), setPriceMin("");
              }}
            >
              <FaTimes />
            </div>
          </div>
        )}
      </div>
      {/*  Shop container */}
      <div
        id="shop-container"
        className="flex flex-col-reverse h-full w-screen md:justify-center md:flex-row-reverse  md:mt-2  "
      >
        <div
          id="grid-container"
          className="grid grid-cols-1  gap-y-20 md:w-9/12 md:grid-cols-4 "
        >
          {data.map((item, index) => {
            const { name, image, creationAt } = item.category;
            const { id, title, price } = item;
            return (
              <Link to={`/home/${id}`} key={id}>
                <div
                  id="grid-card"
                  className=" bg-white w-full md:w-[17.25rem] h-[23rem] gridCard"
                >
                  <div id="card-image" className="p-3">
                    <img
                      src={image}
                      alt=""
                      className="object-none object-center"
                    />
                  </div>

                  <div id="card-info" className="p-4 space-y-2 mb-0">
                    <div
                      id="card-title"
                      className="font-Roboto font-normal text-2xl"
                    >
                      {name}
                    </div>
                    <div
                      id="card-price"
                      className="flex items-center justify-between"
                    >
                      <div
                        id="price"
                        className="font-Roboto font-bold text-xl text-brightRed"
                      >
                        {`${price}\u058F`}
                      </div>
                      <button
                        id="type"
                        className="px-[0.50rem] font-semibold rounded-md bg-brightRed text-white text-[0.563rem]"
                      >
                        {index % 2 === 0 ? "NEW" : "USED"}
                      </button>
                    </div>
                    <div
                      id="card-description"
                      className="flex items-center justify-between"
                    >
                      <p
                        id="description"
                        className="font-Poppins font-normal text-sm"
                      >
                        {title}
                      </p>
                      <p id="data" className="text-xs">
                        {creationAt.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {!data.length && (
            <NotFound
              sentence={"Item not found please re-search using another filter."}
            />
          )}
        </div>

        {/* Filter section */}
        <div id="filter" className="w-2/12 mr-10 border border-[#ccc]">
          <div
            id="filter-content"
            className="flex flex-col h-full p-4 space-y-6"
          >
            <div id="filter-heading" className="w-full border-b-2 border-[#cc]">
              <h2 className="text-4xl font-Poppins text-brightIshBlue">
                Filter Items
              </h2>
            </div>
            <div id="filter-body" className="flex flex-col w-full">
              <div className=" space-y-4 mb-10">
                <h2 className="text-2xl font-Montserrat text-darkIshGray underline underline-offset-8 decoration-2 decoration-brightIshBlue mb-8">
                  Category
                </h2>
                <div className="flex flex-col justify-center space-y-4 ">
                  <div className="flex w-full">
                    <input
                      type="radio"
                      id="clothes"
                      name="category"
                      value="1"
                      className="w-full"
                      onClick={getCategory}
                    />
                    <label htmlFor="clothes" className="text-darkIshGray">
                      Clothes
                    </label>
                  </div>
                  <div className="flex w-full">
                    <input
                      type="radio"
                      id="electronics"
                      name="category"
                      value="2"
                      className="w-full"
                      onClick={getCategory}
                    />
                    <label htmlFor="electronics" className="text-darkIshGray">
                      Electronics
                    </label>
                  </div>
                  <div className="flex w-full">
                    <input
                      type="radio"
                      id="furniture"
                      name="category"
                      value="3"
                      className="w-full"
                      onClick={getCategory}
                    />
                    <label htmlFor="furniture" className="text-darkIshGray">
                      Furniture
                    </label>
                  </div>
                  <div className="flex w-full">
                    <input
                      type="radio"
                      id="shoes"
                      name="category"
                      value="4"
                      className="w-full"
                      onClick={getCategory}
                    />
                    <label htmlFor="shoes" className="text-darkIshGray">
                      Shoes
                    </label>
                  </div>
                  <div className="flex w-full">
                    <input
                      type="radio"
                      id="others"
                      name="category"
                      value="5"
                      className="w-full"
                      onClick={getCategory}
                    />
                    <label htmlFor="others" className="text-darkIshGray">
                      Others
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8 mb-10 border-t border-[#ccc]">
                <h2 className="text-2xl font-Montserrat text-darkIshGray underline underline-offset-8 decoration-2 decoration-brightIshBlue mb-8">
                  Price
                </h2>
                <div className="">
                  <label htmlFor="price-input" className="text-darkIshGray">
                    Price:
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="space-y-4 rounded-md border-2 border-[#ccc]"
                    onChange={getPrice}
                  />
                </div>
              </div>
              <div className="space-y-4 border-t pt-8 border-[#ccc]">
                <h2 className="text-2xl font-Montserrat text-darkIshGray underline underline-offset-8 decoration-2 decoration-brightIshBlue mb-8">
                  Choose price range
                </h2>
                <div className="flex flex-row w-full ">
                  <div id="min" className="w-1/2">
                    <label htmlFor="min" className="text-darkIshGray">
                      min:
                    </label>
                    <input
                      type="number"
                      name="min"
                      id="min"
                      className="w-1/2 border-2 border-[#ccc] rounded-md"
                      onChange={getMinPrice}
                    />
                  </div>
                  <div id="max" className="w-1/2 ">
                    <label htmlFor="max" className="text-darkIshGray">
                      max:
                    </label>
                    <input
                      type="number"
                      name="max"
                      id="max"
                      className="w-1/2 border-2 border-[#ccc] rounded-md"
                      onChange={getMaxPrice}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center ml-0 relative w-full md:w-4/5 my-20 md:space-x-0">
        <p className=" w-2/5 h-[1px] border border-lightIshGray"></p>
        <button className="  rounded-2xl border border-brightRed">
          {limit === 12 ? (
            <p
              className="px-8 p-2 font-Montserrat font-medium text-3xl"
              onClick={() => setLimit((prev) => (prev = 20))}
            >
              View More
            </p>
          ) : (
            <p
              className="px-8 p-2 font-Montserrat font-medium text-3xl"
              onClick={() => setLimit((prev) => (prev = 12))}
            >
              View Less
            </p>
          )}
        </button>
        <p className=" w-2/5  h-[1px] border border-lightIshGray"></p>
      </div>
    </section>
  );
}

export default HomePage;
