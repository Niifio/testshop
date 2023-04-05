import React, { useState, useEffect } from "react";
import landingImage from "../images/main.png";
import bcrypt from "bcryptjs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getData, register } from "../redux/features/auth/authSlice";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function RegisterPage() {
  const { users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = uuidv4();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    //validate if all fields has been filled
    if (!name || !email || !password) {
      console.log("Please complete form");
    }
    //Find if User Exist
    const userExist = await users.find((item) => item.email === email);
    if (userExist) {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      return toast("This email has already been used");
    }
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: id,
      name,
      email,
      password: hashedPassword,
    };

    dispatch(register(newUser));
    toast("Congrats! You have been registered");
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    navigate("/");
  };
  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <section className="bg-white flex w-screen h-screen mt-44  justify-center">
      <div className="flex w-full md:flex-row md:w-4/5 md:space-x-8">
        <div className="hidden md:block md:w-full">
          <img src={landingImage} alt="image" className=" w-full" />
        </div>
        <div className="flex flex-col w-full p-2 md:w-4/5">
          <div className="w-full space-y-8">
            <div className="flex flex-col w-full">
              <div className="flex w-full font-Poppins ">
                <button className="bg-grayIsh text-2xl p-[0.688rem] w-1/2">
                  SIGN UP
                </button>
                <button className="bg-blueIshGray text-2xl p-[0.688rem] w-1/2">
                  <Link to="/">SIGN IN</Link>
                </button>
              </div>
              <div className="pl-6">
                <h2 className="font-Poppins font-medium text-[2rem]">
                  Create an account
                </h2>
                <p className="font-Poppins font-light text-darkIshGray text-base">
                  let's get started with your 30 days free trail
                </p>
              </div>
            </div>
            <form className="space-y-8" onSubmit={onSubmitHandler}>
              <div>
                <label htmlFor="name" className="text-base font-Poppins">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  type="text"
                  className="block w-full p-3 focus:outline-none text-lg border-b border-black"
                  required
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-base font-Poppins">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  className="block w-full p-3  focus:outline-none border-b border-black"
                  required
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label htmlFor="password " className="text-base font-Poppins">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  className="block w-full p-3 focus:outline-none border-b border-black"
                  required
                  onChange={onChangeHandler}
                />
              </div>
              <button className="block bg-brightRed w-full rounded-2xl text-white font-Poppins font-medium text-xl h-16">
                Create Account
              </button>
              <button className="block bg-white w-full rounded-2xl text-brightRed font-Poppins font-medium text-xl h-16 border border-darkIshGray">
                Sign up with Google
              </button>
            </form>
          </div>
          <p className="mt-20 mx-auto font-Poppins text-base">
            Already have an account?
            <span className="font-Poppins font-medium pl-2 text-brightIshBlue text-xl">
              <Link to="/">Sign in</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
