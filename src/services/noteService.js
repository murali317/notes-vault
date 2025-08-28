// 👉 this file will contain reusable Firestore functions.
// It creates a new document inside Firestore collection called "notes".

// Document will have:
// userEmail → whose note it belongs to
// text → the actual note
// createdAt → timestamp (so we can sort later if needed)

import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";

// 🟢 Add a new note
export const addNote = async (uid, noteText) => {
    try {
        if (!uid) {
            throw new Error("User ID missing");
        }

        const docRef = await addDoc(collection(db, "notes"), {
            uid,
            text: noteText,
            createdAt: serverTimestamp(),
        });

        return docRef.id;
    } catch (error) {
        console.error("Error adding note:", error);
        throw error;
    }
};

// 🟢 Get all notes for a user
export const getNotes = async (uid) => {
    try {
        if (!uid) {
            throw new Error("User ID missing");
        }

        const notesRef = collection(db, "notes");

        // ✅ Fetch only notes belonging to this user, newest first
        const q = query(notesRef, where("uid", "==", uid), orderBy("createdAt", "desc"));

        const querySnapshot = await getDocs(q);

        // ✅ Convert to array
        const notes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return notes;
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
};

