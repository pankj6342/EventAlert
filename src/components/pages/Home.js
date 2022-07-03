import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHost } from "../../redux/actions";
import AdminDashboard from "./AdminDashboard";
import Dashboard from "./Dashboard";

const Home = () => {
  const { currentUser, isHost } = useSelector((state) => state.user);
  const [host, setHost] = useState(isHost);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isHost) {
      setHost(true);
    }
  }, [host]);
  return (
    <div>
      <button
        className="fixed bottom-30 right-10 "
        onClick={() => {
          setHost((host) => !host);
          dispatch(setHost(!isHost));
        }}
      >
        go to {host ? `user mode` : `host mode`}
      </button>

      {host ? (
        <AdminDashboard currentUser={currentUser} />
      ) : (
        <Dashboard currentUser={currentUser} />
      )}
    </div>
  );
};

export default Home;
