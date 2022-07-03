import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerInitiate } from "../../redux/actions";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHost, setIsHost] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [error, setError] = useState("");
  const [validInput, setValidInput] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/");
  //   }
  // }, [currentUser]);
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      setValidInput(false);
      setError("Password and confrim password must be same");
    } else {
      setError("");
      setValidInput(true);
    }
    if (validInput) {
      // if (isHost) navigate("/pendingPage");
      // else {
      console.log(state);
      dispatch(
        registerInitiate(state.email, state.password, state.displayName, isHost)
      );
      // }
    }
  };

  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <form action="" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2 username">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="username"
              name="email"
              required
              value={state.email}
              onChange={onChange}
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2 username">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="username"
              name="displayName"
              required
              value={state.displayName}
              onChange={onChange}
              placeholder="Your Name"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              type="password"
              name="password"
              required
              value={state.password}
              onChange={onChange}
              placeholder="******************"
            />
            <p className="text-red text-xs italic">Please choose a password.</p>
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              type="password"
              required
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={onChange}
              placeholder="******************"
            />
            <p className="text-red-500 text-sm italic">{error}</p>
          </div>
          <div className="flex items-center justify-between">
            <input
              className="bg-blue-500 hover:bg-blue-600  text-white font-bold py-2 px-4 rounded"
              type="submit"
              //   disabled={state.email === "" || state.password === ""}
              value="Sign Up"
            />

            <a
              className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <input
          className={`${
            isHost ? `bg-red-500` : `bg-green-500`
          } mt-4 w-[300px] text-white font-bold py-2 px-4 rounded`}
          type="submit"
          onClick={() => {
            setIsHost(!isHost);
          }}
          value={`Registering as as a ${isHost ? `Host` : `Atendee`}`}
        />
      </div>
    </div>
  );
};

export default Signup;
