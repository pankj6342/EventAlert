import React, { useEffect, useState } from "react";
// import { getDatabase, ref, child, get, onValue } from "firebase/database";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BucketCard } from "./BucketCard";

export const BucketList = () => {
  const [list, setList] = useState([]);
  const [bucketEvents, setBucketEvents] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const getList = async () => {
    const userRef = collection(db, "user");
    const q = query(userRef, where("authId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const bucketList = doc.data().bucketList;
      setList(bucketList);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <div className="text-xl text-center mb-4 font-bold text-red-600">
        My Bucket List
      </div>
      {list.length === 0 ? (
        <div>no items in bucket list</div>
      ) : (
        <div className="flex flex-col space-y-2">
          {list.map((e) => {
            return <BucketCard key={e.id} details={e} />;
          })}
        </div>
      )}
    </div>
  );
};
