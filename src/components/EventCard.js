import React, { useState } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { AddEditEvent } from "./AddEditEvent";
import { useEvent } from "../customHooks/useEvent";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../customHooks/useUser";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
export const EventCard = ({ details }) => {
  const dispatch = useDispatch();
  const { deleteEvent, deleteSucess } = useEvent(details);
  const { updateUser, getdbId } = useUser();
  const { currentUser } = useSelector((state) => state.user);
  // console.log({ currentUser });

  const onDelete = () => {
    deleteEvent(details.id);
  };
  const addToBucketList = async (eventDetails) => {
    console.log({ addToBucketList });
    const userRef = collection(db, "user");
    var bucketList;
    const q = query(userRef, where("authId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      bucketList = doc.data().bucketList;
    });
    const newBucketList = [...bucketList, eventDetails];
    // const newBucketList = ["hello"];
    var dbId = await getdbId(currentUser.uid);
    console.log({ dbId });
    if (dbId) dispatch(updateUser(dbId, { bucketList: newBucketList }));
  };
  const [registered, setRegisted] = useState(false);
  return (
    <div>
      <div className="flex border-1 sm:w-[90%] md:min-w-[100%] md:flex">
        <img
          className="border-1 min-w-[40%] min-h-full"
          src="../../public/images/img1.jpg"
          alt=""
        />
        <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="text-gray-900 font-bold text-xl mb-2 hover:text-gray-600 hover:cursor-pointer ">
                {details.title} | {details.type || "type"}
              </div>
              <div className="flex justify-evenly space-x-1">
                <AddEditEvent details={details} update={true}>
                  <PencilAltIcon
                    className="hover:scale-125 hover:cursor-pointer"
                    height={20}
                    width={20}
                  />
                </AddEditEvent>
                <TrashIcon
                  onClick={onDelete}
                  className="hover:scale-125 hover:cursor-pointer"
                  height={20}
                  width={20}
                />
              </div>
            </div>
            <p className="text-gray-700 text-base">{details.description}</p>
          </div>
          <div className="flex items-center justify-evenly">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="/img/jonathan.jpg"
              alt=""
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{details.place}</p>
              <p className="text-gray-600">{details.date}</p>
            </div>
            <button
              // disabled={registered}
              onClick={() => {
                addToBucketList(details);
                setRegisted(!registered);
              }}
              className={`${
                !registered ? `bg-blue-500` : `bg-green-700`
              } p-2 rounded-xl text-white hover:bg-blue-700`}
            >
              {!registered ? `Register` : `Registered`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
