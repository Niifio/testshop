import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getData,
  updateUser,
  deleteUser,
} from "../redux/features/auth/authSlice";
import profileImg from "../images/profileImg.png";
function ProfilePage() {
  const { users } = useSelector((state) => state.auth);
  const [item, setItem] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { name, email, password1 } = formData;

  const onChangeHandler = async (e) => {
    e.preventDefault();

    setformData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const update = users.filter((el) => el.id == id);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password1, salt);

    const updateData = {
      id: update[0].id,
      name: name ? name : update[0].name,
      email: email ? email : update[0].email,
      password: hashedPassword ? hashedPassword : update[0].password,
    };
    dispatch(updateUser(updateData));
    setIsEdited(false);
  };

  const onDeleteClick = (e) => {
    e.preventDefault();
    const ondelete = users.filter((el) => el.id == id);
    const response = ondelete[0].id;
    dispatch(deleteUser(response));
    navigate("/");
  };

  useEffect(() => {
    dispatch(getData());
  }, [name]);

  useEffect(() => {
    const userPrifle = users.filter((el) => el.id == id);
    if (userPrifle.length)
      localStorage.setItem("select", JSON.stringify(userPrifle));
  }, []);
  useEffect(() => {
    let selected = JSON.parse(localStorage.getItem("select"));
    setItem(selected);
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="flex item-center justify-center w-full mt-40">
        {item.map((user) => {
          const { id, name, email } = user;
          return (
            <div
              key={id}
              className="flex  flex-col w-2/5 items-center justify-center p-20 border border-darkIshGray rounded-lg space-y-10"
            >
              <div className="w-full h-80">
                <img
                  src={profileImg}
                  alt=""
                  className="w-full h-full object-center"
                />
              </div>
              {!isEdited ? (
                <>
                  <div className="w-full space-y-4">
                    <div className="flex items-center  border-2 border-darkIshGray w-full rounded-lg">
                      <p className="text-2xl pl-16 p-2 bg-darkIshGray h-full border-r-2 border-darkIshGray text-white">
                        Name
                      </p>
                      <p className="text-2xl pl-20 ">{name}</p>
                    </div>
                    <div className="flex items-center  border-2 border-darkIshGray w-full rounded-lg">
                      <p className="text-2xl pl-16 p-2 bg-darkIshGray h-full border-r-2 border-darkIshGray text-white">
                        Email
                      </p>
                      <p className="text-2xl pl-20">{email}</p>
                    </div>
                    <div className="flex items-center   border-2 border-darkIshGray w-full rounded-lg">
                      <p className="text-2xl pl-16 p-2 bg-darkIshGray h-full border-r-2 border-darkIshGray text-white">
                        Passoword
                      </p>
                      <p className="text-4xl pl-8 ">.............</p>
                    </div>
                  </div>
                  <div
                    className="self-end text-2xl   py-2 px-8 border-2 border-darkIshGray rounded-lg"
                    onClick={() => setIsEdited(true)}
                  >
                    <button>Edit</button>
                  </div>
                  <div
                    className="self-end text-xl text-white py-2 px-8  bg-brightRed outline-none rounded-lg"
                    onClick={onDeleteClick}
                  >
                    <button>Delete Account</button>
                  </div>
                </>
              ) : (
                <>
                  <form className="w-full space-y-4" onSubmit={onSubmitHandler}>
                    <div className="flex items-center  border-2 border-darkIshGray w-full rounded-lg">
                      <p className="text-2xl pl-16 p-2 bg-darkIshGray h-full border-r-2 border-darkIshGray text-white">
                        Name
                      </p>
                      <input
                        type="text"
                        className="text-2xl pl-20 text-darkIshGray w-full h-full focus:outline-none"
                        name="name"
                        id="name"
                        defaultValue={formData.name}
                        onChange={onChangeHandler}
                      />
                    </div>
                    <div className="flex items-center  border-2 border-darkIshGray w-full rounded-lg">
                      <p className="text-2xl pl-16 p-2 bg-darkIshGray h-full border-r-2 border-darkIshGray text-white">
                        Email
                      </p>
                      <input
                        className="text-2xl pl-20 w-full h-full text-darkIshGray focus:outline-none"
                        defaultValue={formData.email}
                        name="email"
                        id="email"
                        onChange={onChangeHandler}
                      />
                    </div>
                    <div className="flex items-center border-2 border-darkIshGray w-full rounded-lg">
                      <p className="text-2xl p-2 w-full bg-darkIshGray h-full border-r-2 border-darkIshGray text-white">
                        Password
                      </p>
                      <input
                        type="password"
                        className="text-4xl pl-8 w-full h-full text-darkIshGray focus:outline-none"
                        name="password1"
                        defaultValue=""
                        onChange={onChangeHandler}
                      />
                    </div>
                    {/* <div className="flex items-center   border-2 border-darkIshGray w-full rounded-lg">
                      <p className="text-2xl  p-2 w-full bg-darkIshGray h-full border-r-2 border-darkIshGray text-white">
                        New Passoword
                      </p>
                      <input
                        type="password"
                        className="text-4xl pl-8 w-full h-full text-darkIshGray focus:outline-none"
                        disabled={isDisabled}
                        name="password2"
                        defaultValue="............"
                        onChange={onChangeHandler}
                      />
                    </div> */}
                    <button
                      type="submit"
                      className="self-end text-2xl   py-2 px-8 border-2 border-darkIshGray rounded-lg"
                      //   onClick={() => setIsEdited(false)}
                    >
                      Save
                    </button>
                    {/* <div
                      className="self-end text-2xl   py-2 px-8 border-2 border-darkIshGray rounded-lg"
                      onClick={() => setIsEdited(false)}
                    >
                      save
                    </div> */}
                  </form>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfilePage;
