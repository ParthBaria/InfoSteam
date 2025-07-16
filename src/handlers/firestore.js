import {
  getFirestore,
  serverTimestamp,
  setDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import app from "../lib/firebase.config";

const db = getFirestore(app);

const firestore = {

  readDoc: (...args) => {
    const[inputs]=args;
    let docs = [];
    const ref = collection(db, "userNews");
    const q=query(ref,where("email","==",inputs));
    return new Promise(async (resolve) => {
      try {
        const snapShots = await getDocs(q);
        snapShots.forEach((doc) => {
          const d = { ...doc.data() };
          docs.push(d);
        });

       resolve( docs);
      } catch (error) {
        console.log(error);
      }
    });
  },
  writeDoc: (...args) => {
    const [inputs, collection_name] = args;

    return new Promise(async (resolve, reject) => {
      const randomIndex = Math.floor(Math.random() * 10000000);

      try {
        const docRef = doc(db, "userNews", `${randomIndex}`);
        await setDoc(docRef, { ...inputs, createdAt: serverTimestamp() });

        resolve("Document written successfully");
      } catch (error) {
        console.error("Error writing document:", error);
        reject(error);
      }
    });
  },
};

export default firestore;
