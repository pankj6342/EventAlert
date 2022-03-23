import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";

export const useEvent = (eventData) => {
  const { currentUser } = useSelector((state) => state.user);
  const [addSucess, setAddSucess] = useState(false);
  const [updateSucess, setUpdateSucess] = useState(false);
  const [deleteSucess, setDeleteSucess] = useState(false);
  // useEffect(() => console.log(currentUser.uid), []);

  const createEvent = async (data) => {
    try {
      await addDoc(collection(db, "events"), {
        author: currentUser.displayName,
        title: data.title,
        description: data.description,
        createdAt: Timestamp.now(),
        place: data.place,
        date: data.date,
        createdBy: currentUser.uid,
      });
      console.log("added success");
      setAddSucess(true);
    } catch (error) {
      console.log({ addEventError: error.message });
    }
  };
  
  const updateEvent = async (id, data) => {
    try {
      const userDoc = doc(db, "events", id);
      await updateDoc(userDoc, data);
      console.log("updated successfully");
      setUpdateSucess(true);
    } catch (error) {
      console.log({ updateEventError: error.message });
    }
  };

  const deleteEvent = async (id) => {
    try {
      const userDoc = doc(db, "events", id);
      await deleteDoc(userDoc);
      setDeleteSucess(true);
    } catch (error) {
      console.log({ deleteEventError: error.message });
    }
  };
  return {
    createEvent,
    updateEvent,
    deleteEvent,
    updateSucess,
    addSucess,
    deleteSucess,
  };
};
