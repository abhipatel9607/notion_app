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
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Get all documents in a collection filtered and ordered by a property
export const getAllById = async (tableName, compareProperty, compareValue) => {
  try {
    const collectionRef = collection(db, tableName);
    const q = query(
      collectionRef,
      where(compareProperty, "==", compareValue),
      orderBy("createdAt", "asc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      [`${tableName}Id`]: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt instanceof Timestamp
          ? doc.data().createdAt.toMillis()
          : doc.data().createdAt,
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

    if (updatedData.createdAt instanceof Timestamp) {
      updatedData.createdAt = updatedData.createdAt.toMillis();
    }

    await updateDoc(docRef, { ...updatedData });
  } catch (error) {
    console.error(`Error updating ${tableName} document:`, error);
    throw error;
  }
};
