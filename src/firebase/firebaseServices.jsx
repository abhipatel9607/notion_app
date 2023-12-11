/** @format */
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Get all documents in a collection filtered and ordered by a property
export const getAllById = async (tableName, compareProperty, compareValue) => {
  try {
    const collectionRef = collection(db, tableName);
    const q = query(
      collectionRef,
      where(compareProperty, "==", compareValue),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      [`${tableName}Id`]: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error getting all ${tableName}:`, error);
    throw error;
  }
};

export const createData = async (data, tableName) => {
  try {
    const collectionRef = collection(db, tableName);
    const createdWorkspaceData = await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return createdWorkspaceData;
  } catch (error) {
    console.error(`Error creating ${tableName} data:`, error);
    return error;
  }
};

// Update a document in a collection
export const updateData = async (tableName, docId, updatedData) => {
  try {
    const docRef = doc(db, tableName, docId);
    await updateDoc(docRef, { ...updatedData });
  } catch (error) {
    console.error(`Error updating ${tableName} document:`, error);
    throw error;
  }
};
