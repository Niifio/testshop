import React, { useState } from "react";
import { MdUpdate, MdCreate } from "react-icons/md";
function CrudPage() {
  const [actionBtn, setActionBtn] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    image: "",
  });
  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className="mt-60 w-screen h-screen">
      <div>
        <form className="pl-4 space-y-4 w-2/5">
          <div className="flex items-center  border-2 border-darkIshGray w-full rounded-lg">
            <label
              htmlFor="title"
              className="text-2xl pl-16 p-2 bg-darkIshGray h-full border-r-2 border-darkIshGray text-white"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="text-2xl pl-20 text-darkIshGray w-full h-full focus:outline-none"
            />
          </div>
          <div className="flex items-center  border-2 border-darkIshGray w-full rounded-lg">
            <label
              htmlFor="price"
              className="text-2xl pl-16 p-2 bg-darkIshGray h-full border-r-2 border-darkIshGray text-white"
            >
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              className="text-2xl pl-20 text-darkIshGray w-full h-full focus:outline-none"
            />
          </div>
          <div className="flex items-center  border-2 border-darkIshGray w-full rounded-lg">
            <label
              htmlFor="description"
              className="text-2xl pl-16 p-2 bg-darkIshGray h-full border-r-2 border-darkIshGray text-white"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="text-2xl pl-20 text-darkIshGray w-full h-full focus:outline-none"
            />
          </div>
          <div className="flex items-center  border-2 border-darkIshGray w-full rounded-lg">
            <label
              htmlFor="category"
              className="text-2xl pl-16 p-2 bg-darkIshGray h-full border-r-2 border-darkIshGray text-white"
            >
              CategoryId:
            </label>
            <input
              type="number"
              id="category"
              name="categoryId"
              min={1}
              max={5}
              className="text-2xl pl-20 text-darkIshGray w-full h-full focus:outline-none"
            />
          </div>
          <div className="flex items-center  border-2 border-darkIshGray w-full rounded-lg">
            <label
              htmlFor="image"
              className="text-2xl pl-16 p-2 bg-darkIshGray h-full border-r-2 border-darkIshGray text-white"
            >
              Image:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="text-2xl pl-20 text-darkIshGray w-full h-full focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-end space-x-6">
            {actionBtn ? (
              <button
                type="submit"
                className="text-2xl py-2 px-8 border-2 border-darkIshGray rounded-lg"
              >
                Create
              </button>
            ) : (
              <button
                type="submit"
                className="text-2xl py-2 px-8 border-2 border-darkIshGray rounded-lg"
              >
                Update
              </button>
            )}

            <div
              className=" p-1 text-4xl rounded-lg border-2 border-darkIshGray"
              onClick={() => setActionBtn((prevState) => !prevState)}
            >
              {actionBtn ? (
                <MdUpdate className="text-[#50CC98]" />
              ) : (
                <MdCreate className="text-brightIshBlue" />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrudPage;
