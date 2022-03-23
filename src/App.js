import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setHost, setUser } from "./redux/actions";
import { BucketList } from "./components/pages/BucketList";
import { useUser } from "./customHooks/useUser";
import Home from "./components/pages/Home";

function App() {
  const dispatch = useDispatch();
  const { createUser } = useUser();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        const authId = user.uid;
        createUser({ authId });
        dispatch(setHost({ authId }));
      }
    });
  }, [dispatch]);
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bucketList" element={<BucketList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
