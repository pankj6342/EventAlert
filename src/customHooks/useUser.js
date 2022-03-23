import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";

export const useUser = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [addSucess, setAddSucess] = useState(false);
  const [updateSucess, setUpdateSucess] = useState(false);
  // useEffect(() => console.log(currentUser.uid), []);
  const [dbId, setDbId] = useState("");
  const createUser = async (data) => {
    try {
      await addDoc(collection(db, "user"), {
        interests: data.interests || [],
        bucketList: data.bucketList || [],
        authId: data.authId,
        isHost: data.isHost || false,
      });
      console.log("added success");
      setAddSucess(true);
    } catch (error) {
      console.log({ addUserError: error.message });
    }
  };

  const getdbId = async (authID) => {
    const userRef = collection(db, "user");
    const q = query(userRef, where("authId", "==", authID));
    const querySnapshot = await getDocs(q);
    console.log("docsnap", querySnapshot);
    var dbId = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().authId === authID) {
        console.log(doc.id, "docid", authID, doc.data().authId);
        dbId = doc.id;
      }
    });
    return dbId;
  };

  const updateUser = async (id, data) => {
    try {
      console.log("updated user called");
      const userDoc = doc(db, "user", id);
      await updateDoc(userDoc, data);
      console.log("user update successful");
      setUpdateSucess(true);
    } catch (error) {
      console.log({ updateUserError: error.message });
    }
  };

  return {
    createUser,
    updateUser,
    updateSucess,
    addSucess,
    getdbId,
    dbId,
  };
};
