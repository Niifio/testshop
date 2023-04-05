import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import landingImage from "../images/main.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getData, login } from "../redux/features/auth/authSlice";
function LoginPage() {
  const { users } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // validate if all fields has been filled
    if (!email || !password) {
      return toast("Please complete form");
    }
    // Find if User Exist
    const user = await users.find((item) => item.email === email);
    if (!user) {
      return toast("User does not exist please register");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const loginUser = {
        id: user.id,
        name: user.name,
        email,
      };
      console.log(loginUser);
      dispatch(login(loginUser));
    } else {
      toast("Incorrect password");
      return;
    }
    navigate("/home");
    setFormData({
      email: "",
      password: "",
    });
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
                  <Link to="/register">SIGN UP</Link>
                </button>
                <button className="bg-blueIshGray text-2xl p-[0.688rem] w-1/2">
                  SIGN IN
                </button>
              </div>
              <div className="pl-6">
                <h2 className="font-Poppins font-medium text-[2rem]">Login</h2>
                <p className="font-Poppins font-light text-darkIshGray text-base">
                  Welcome back
                </p>
              </div>
            </div>
            <form className="space-y-8" onSubmit={onSubmitHandler}>
              <div>
                <label htmlFor="email" className="text-base font-Poppins">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  className="block w-full p-3  focus:outline-none border-b border-black"
                  onChange={onChangeHandler}
                  required
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
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <button className="block bg-brightRed w-full rounded-2xl text-white font-Poppins font-medium text-xl h-16">
                Login
              </button>
              <button className="block bg-white w-full rounded-2xl text-brightRed font-Poppins font-medium text-xl h-16 border border-darkIshGray">
                Sign in with Google
              </button>
            </form>
          </div>
          <p className="mt-20 mx-auto font-Poppins text-base">
            Do not have an account?
            <span className="font-Poppins pl-2 font-medium text-brightIshBlue text-xl">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
