import {
  getFirestore,
  serverTimestamp,
  setDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc as deleteFirestoreDoc,
} from "firebase/firestore";
import app from "../lib/firebase.config";
import { toast } from "react-toastify";

const db = getFirestore(app);

const firestore = {
  // 🧩 Read documents matching an email
  async readDoc(email) {
    try {
      const ref = collection(db, "userNews");
      const q = query(ref, where("email", "==", email));
      const snapShots = await getDocs(q);

      const docs = snapShots.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      toast.success("Documents fetched successfully ✅");
      return docs;
    } catch (error) {
      console.error("Error reading documents:", error);
      toast.error("Failed to fetch documents ❌");
      throw error;
    }
  },

  // 🧩 Write a new document
  async writeDoc(data) {
    try {
      const randomId = Math.floor(Math.random() * 1e7).toString();
      const docRef = doc(db, "userNews", randomId);

      await setDoc(docRef, { ...data, createdAt: serverTimestamp() });

      toast.success("Document added successfully ✅");
      return "Document written successfully";
    } catch (error) {
      console.error("Error writing document:", error);
      toast.error("Failed to add document ❌");
      throw error;
    }
  },

  // 🧩 Delete a document by ID
  async deleteDoc(id) {
    try {
      const docRef = doc(db, "userNews", id);
      await deleteFirestoreDoc(docRef);

      toast.success("Document deleted successfully 🗑️");
      return "Document deleted successfully";
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document ❌");
      throw error;
    }
  },
};

export default firestore;
