import { PlusCircleIcon } from "@heroicons/react/solid";
import { updateCurrentUser } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { AddEditEvent } from "../AddEditEvent";

const AdminDashboard = () => {
  const [myEvents, setMyEvents] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const getEvents = async () => {
    console.log("myevents");
    const eventRef = collection(db, "events");
    const q = query(eventRef, where("createdBy", "==", currentUser?.uid));
    const querySnapshot = await getDocs(q);
    var ev = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      if (doc.data().createdBy === currentUser?.uid) ev = [...ev, doc.data()];
    });
    console.log(myEvents);
    setMyEvents(ev);
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className="">
      <p className="text-2xl text-center">Host Dashboard</p>
      <div className="w-full m-auto flex items-center justify-around space-x-4  shadow-xl h-[400px]">
        <div className="flex flex-col items-center">
          <AddEditEvent host={true}>
            <PlusCircleIcon
              color="blue"
              className="hover:scale-125"
              height={100}
              width={100}
            />
          </AddEditEvent>
          <p className="text-2xl ">Add An Event</p>
        </div>
        <div className="shadow-md border-l-2 w-[50%] h-full">
          <p className="text-4xl text-center font-mono">
            Hello {currentUser?.displayName || ""}
          </p>
          <div className="flex items-center justify-around">
            <div className="flex flex-col align-center">
              <div className="px-4 text-green-700">ongoing event</div>
              <div className="px-4 my-4 block text-5xl border-r-4 m-auto">
                SMART <br />
                INDIA <br /> HACKATHON
              </div>
              <div>
                <ul className="pl-5 text-xl">
                  <li>Event Category: Hackathon</li>
                  <li>Date: 23-24 March,2022</li>
                  <li>Venue: CCN, NIT Kurukshetra </li>
                </ul>
                <button className="ml-4 mt-4 bg-green-500 text-white font-bold p-2 rounded-full">
                  Edit Details
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-6xl">45</p>
              <p>students are interested</p>
            </div>
          </div>
        </div>
      </div>
      <div className="recent-events py-4 w-full m-auto flex flex-col items-center justify-around space-x-4  shadow-xl h-[400px]">
        <p className="text-4xl text-green-700 border-b-4">My Recent Events</p>
        <div className="w-full text-center text-white flex items-center justify-evenly overflow-x-auto">
          {myEvents.map((e) => (
            <div key={e.id} className="p-4 rounded-full text-3xl bg-green-600">
              {e.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
