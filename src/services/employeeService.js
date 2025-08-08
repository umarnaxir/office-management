import { db, auth } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc,
  query,
  where
} from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const addEmployee = async (employeeData) => {
  try {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    const { email, password, ...otherData } = employeeData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const docRef = await addDoc(collection(db, 'employees'), {
      ...otherData,
      uid: user.uid,
      email: user.email
    });
    return docRef.id;
  } catch (error) {
    console.error('Failed to add employee:', error);
    throw new Error(error.message || 'Failed to register employee');
  }
};

export const fetchEmployees = async () => {
  const snapshot = await getDocs(collection(db, 'employees'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const userLogin = async (email, password) => {
  try {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Query the employees collection for a document with matching uid
    const employeesRef = collection(db, 'employees');
    const q = query(employeesRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const employeeDoc = querySnapshot.docs[0];
      return {
        user: { uid: user.uid, email: user.email },
        employeeData: { id: employeeDoc.id, ...employeeDoc.data() }
      };
    } else {
      throw new Error('Employee data not found in database');
    }
  } catch (error) {
    console.error('Firebase login error:', error);
    throw new Error(error.message || 'Login failed');
  }
};