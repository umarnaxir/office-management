import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';

export const addBill = async (billData) => {
  try {
    const docRef = await addDoc(collection(db, 'bills'), {
      ...billData,
      amount: parseFloat(billData.amount),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    throw new Error(`Failed to add bill: ${error.message}`);
  }
};

export const fetchBills = async () => {
  try {
    const q = query(
      collection(db, 'bills'), 
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(error.message || "Failed to fetch bills");
  }
};

export const updateBill = async (id, updateData) => {
  try {
    const billRef = doc(db, 'bills', id);
    await updateDoc(billRef, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to update bill");
  }
};

export const deleteBill = async (id) => {
  try {
    const billRef = doc(db, 'bills', id);
    await deleteDoc(billRef);
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to delete bill");
  }
};

export const fetchBillsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, 'bills'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(error.message || "Failed to fetch bills by category");
  }
};