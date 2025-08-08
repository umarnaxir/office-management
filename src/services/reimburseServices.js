import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';

export const addReimbursement = async (reimbursementData) => {
  try {
    const dataToStore = {
      employeeName: String(reimbursementData.employeeName).trim(),
      description: String(reimbursementData.description).trim(),
      amount: Number(reimbursementData.amount),
      category: String(reimbursementData.category),
      date: reimbursementData.date || new Date().toISOString().split('T')[0],
      status: reimbursementData.status || 'pending',
      receiptFile: reimbursementData.receiptFile || null,
      createdAt: reimbursementData.createdAt || new Date().toISOString(),
      followUpDate: reimbursementData.followUpDate || null
    };
    
    const docRef = await addDoc(collection(db, 'reimbursements'), dataToStore);
    return docRef.id;
  } catch (error) {
    throw new Error(`Failed to add reimbursement: ${error.message}`);
  }
};

export const fetchReimbursements = async () => {
  try {
    const q = query(
      collection(db, 'reimbursements'), 
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(error.message || "Failed to fetch reimbursements");
  }
};

export const updateReimbursement = async (id, updateData) => {
  try {
    const reimbursementRef = doc(db, 'reimbursements', id);
    const dataToUpdate = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    if (updateData.amount !== undefined) {
      dataToUpdate.amount = parseFloat(updateData.amount) || 0;
    }
    
    await updateDoc(reimbursementRef, dataToUpdate);
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to update reimbursement");
  }
};

export const deleteReimbursement = async (id) => {
  try {
    const reimbursementRef = doc(db, 'reimbursements', id);
    await deleteDoc(reimbursementRef);
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to delete reimbursement");
  }
};