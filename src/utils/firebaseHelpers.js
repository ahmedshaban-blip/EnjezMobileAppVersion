// src/utils/firebaseHelpers.js
import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";

/**
 * Get a single document by ID
 */
export const getDocById = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching document from ${collectionName}:`, error);
    return null;
  }
};

/**
 * Get all documents from a collection
 */
export const getAllDocs = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    return docs;
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName}:`, error);
    return [];
  }
};

/**
 * Get documents filtered by a field value
 */
export const getDocsByField = async (collectionName, fieldName, fieldValue) => {
  try {
    const q = query(collection(db, collectionName), where(fieldName, "==", fieldValue));
    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    return docs;
  } catch (error) {
    console.error(
      `Error fetching documents from ${collectionName} where ${fieldName} == ${fieldValue}:`,
      error
    );
    return [];
  }
};

/**
 * Add a new document to a collection
 */
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    return null;
  }
};

/**
 * Update a document
 */
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    return { id: docId, ...data };
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    return null;
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    return false;
  }
};

/**
 * Query documents with multiple conditions
 */
export const queryDocs = async (collectionName, conditions) => {
  try {
    let q = query(collection(db, collectionName));

    if (conditions && conditions.length > 0) {
      const whereConditions = conditions.map((cond) =>
        where(cond.field, cond.operator || "==", cond.value)
      );
      q = query(collection(db, collectionName), ...whereConditions);
    }

    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    return docs;
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    return [];
  }
};


/**
 * Create a new booking
 */
export const createBooking = async (booking) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...booking,
      adminSeen: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      referenceID: "BKG-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
};

/**
 * Get paginated documents
 */
export const getPaginatedDocs = async (collectionName, pageSize, lastDoc = null, conditions = []) => {
  try {
    let constraints = [];

    if (conditions && conditions.length > 0) {
      conditions.forEach((cond) => {
        constraints.push(where(cond.field, cond.operator || "==", cond.value));
      });
    }

    constraints.push(limit(pageSize));

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);

    const docs = [];
    let lastVisible = null;

    if (!querySnapshot.empty) {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
    }

    return { docs, lastVisible };
  } catch (error) {
    console.error("Error fetching paginated docs:", error);
    return { docs: [], lastVisible: null };
  }
};

/**
 * Get all bookings for a specific user
 */
export const getUserBookings = async (userId) => {
  try {
    const q = query(collection(db, "bookings"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    return docs;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
};
