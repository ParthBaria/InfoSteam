import {
  getFirestore,
  serverTimestamp,
  setDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import app from "../lib/firebase.config";

const db = getFirestore(app);

const firestore = {

  readDoc: (...args) => {
    const[inputs]=args;
    let docs = [];
    const ref = collection(db, "userNews");
    const q=query(ref,where("email","==",inputs));
    return new Promise(async (resolve,reject) => {
      try {
        const snapShots = await getDocs(q);
        
        snapShots.forEach((doc) => {
          const id=doc.id;
          const d = { ...doc.data(),id};
          docs.push(d);
        });

       resolve( docs);
      } catch (error) {
        reject(error);
      }
    });
  },
  writeDoc: (...args) => {
    const [inputs] = args;

    return new Promise(async (resolve, reject) => {
      const randomIndex = Math.floor(Math.random() * 10000000);

      try {
        const docRef = doc(db, "userNews", `${randomIndex}`);
        await setDoc(docRef, { ...inputs, createdAt: serverTimestamp() });

        resolve("Document written successfully");
      } catch (error) {
        reject(error);
      }
    });
  },
  
  deleteDoc: (...args) => {
    const [inputs] = args;

    return new Promise(async (resolve, reject) => {
      try {
        const docRef = doc(db, "userNews", `${inputs}`);
        await deleteDoc(docRef);

        resolve("Document deleted successfully");
      } catch (error) {
        reject(error);
      }
    });
  },

};

export default firestore;
