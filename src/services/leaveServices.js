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

// CREATE leave
export const addLeave = async (leaveData) => {
  try {
    const dataToStore = {
      ...leaveData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, 'leaves'), dataToStore);
    return docRef.id;
  } catch (error) {
    throw new Error(`Failed to add leave: ${error.message}`);
  }
};

// FETCH all leaves
export const fetchLeaves = async () => {
  try {
    const q = query(
      collection(db, 'leaves'), 
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(error.message || "Failed to fetch leaves");
  }
};

// UPDATE leave status
export const updateLeaveStatus = async (id, status) => {
  try {
    const leaveRef = doc(db, 'leaves', id);
    await updateDoc(leaveRef, {
      status,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to update leave status");
  }
};

// DELETE leave
export const deleteLeave = async (id) => {
  try {
    const leaveRef = doc(db, 'leaves', id);
    await deleteDoc(leaveRef);
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to delete leave");
  }
};

// FETCH leaves by status
export const fetchLeavesByStatus = async (status) => {
  try {
    const q = query(
      collection(db, 'leaves'),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(error.message || "Failed to fetch leaves by status");
  }
};