import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { useUser } from "../../customHooks/useUser";
import { TrashIcon } from "@heroicons/react/solid";

export const BucketCard = ({ details }) => {
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // console.log("bucket called", currentUser);
  }, []);
  const dispatch = useDispatch();
  const { updateUser, getdbId } = useUser();

  const removeFromBucketList = async (id) => {
    const userRef = collection(db, "user");
    var bucketList;
    const q = query(userRef, where("authId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      bucketList = doc.data().bucketList;
    });
    const newBucketList = bucketList.filter((item) => item.id !== id);
    console.log(newBucketList);
    var dbId = await getdbId(currentUser.dbId);
    console.log(dbId);
    dispatch(updateUser(dbId, { bucketList: newBucketList }));
  };
  return (
    <div className=" p-4 flex items-center justify-between space-x-2">
      <div>
        <div className="font-bold">{details.title}</div>
        <div>{details.date}</div>
      </div>
      <TrashIcon
        className="ml-3"
        height={20}
        width={20}
        color=""
        onClick={() => removeFromBucketList(details.id)}
      />
    </div>
  );
};
