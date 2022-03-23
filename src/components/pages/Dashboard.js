import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
// import { scheduleMail } from "../../backend";
import { AddEditEvent } from "../AddEditEvent";
import { BucketList } from "./BucketList";
import UpcomingEvents from "./UpcomingEvents";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const eventCollectionRef = collection(db, "events");
  const { currentUser } = useSelector((state) => state.user);
  const getEvents = async () => {
    const data = await getDocs(eventCollectionRef);
    // const data = await getDocs(collection(db, "user"));
    const eventsArray = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setEvents(eventsArray);
  };
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      try {
        getEvents();
      } catch (error) {
        console.log({ ErrorInFetchingEvents: error.message });
      }
    }
    console.log({ currentUser });
  }, [currentUser]);

  return !currentUser ? (
    <div>Unathorised</div>
  ) : (
    <div className="min-h-screenbg-[#81d4fa]">
      <p className="text-[2rem] font-bold text-center">
        Hii Welcome to our site!
      </p>
      <button
        className=" bg-blue-600 rounded-md p-2 text-white fixed right-5 bottom-40 "
        onClick={() => {}}
      >
        Send Mail
      </button>

      <button
        className=" bg-blue-600 rounded-md p-2 text-white fixed right-5 bottom-20 "
        onClick={getEvents}
      >
        Refresh
      </button>
      <br />
      <div>
        <AddEditEvent>
          <button
            className="fixed right-5 bottom-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Add an Event
          </button>
        </AddEditEvent>
      </div>
      <div className="flex justify-evenly space-y-2 md:flex">
        <UpcomingEvents events={events} />
        <BucketList />
      </div>
    </div>
  );
};

export default Dashboard;
