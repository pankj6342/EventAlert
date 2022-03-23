import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginInitiate } from "../../redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ login: state });
    dispatch(loginInitiate(state.email, state.password));
  };
  const [state, setState] = useState({ email: "", password: "" });
  const [isHost, setIsHost] = useState(false);
  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const { currentUser } = useSelector((state) => state.user) || {};

  // useEffect(() => {
  //   if (currentUser) navigate("/");
  // }, [currentUser]);
  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser]);
  return (
    <div>
      <div className="w-full md:w-[50%] m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="text-4xl text-center ">{!isHost ? `` : ``} Login</div>
        <form action="" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2 username">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="username"
              type="Email"
              name="email"
              required
              value={state.email}
              onChange={onChange}
              placeholder="Email"
            />
          </div>
          {/* <div className={!isHost ? `hidden` : ``}>
            <label className="block text-grey-darker text-sm font-bold mb-2 username">
              UNIQUE HOST ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              name="uniqueId"
              required={isHost}
              value={state.uniqueId}
              onChange={onChange}
              placeholder="unique id"
            />
          </div> */}
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
              name="password"
              type="password"
              required
              value={state.password}
              onChange={onChange}
              placeholder="******************"
            />
            <p className="text-red text-xs italic">Please choose a password.</p>
          </div>
          {/* </form> */}
          <div className="mt-4 flex flex-col justify-between">
            <input
              className="bg-blue-500 hover:bg-blue-600 w-[100px]  text-white font-bold py-2 px-4 rounded"
              type="submit"
              //   disabled={state.email === "" || state.password === ""}
              value="Sign In"
            />

            <a
              className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
              href=""
            >
              Forgot Password?
            </a>
            <br />
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <span>not registerd with us? </span>
                <Link to="/signup">
                  <div className="underline text-blue-500 hover:text-blue-700">
                    singup here
                  </div>
                </Link>
              </div>

              {/* <Link to="/"> */}
              {/* <div
                onClick={() => setIsHost(!isHost)}
                className="underline font-bold text-blue-500 hover:text-blue-700"
              >
                LOGIN AS {isHost ? `STUDENT` : `HOST`}
              </div> */}
              {/* </Link> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
