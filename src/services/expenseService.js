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

// CREATE expense
export const addExpense = async (expenseData) => {
  try {
    const dataToStore = {
      ...expenseData,
      amount: parseFloat(expenseData.amount),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, 'expenses'), dataToStore);
    return docRef.id;
  } catch (error) {
    throw new Error(`Failed to add expense: ${error.message}`);
  }
};

// FETCH all expenses
export const fetchExpenses = async () => {
  try {
    const q = query(
      collection(db, 'expenses'), 
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(error.message || "Failed to fetch expenses");
  }
};

// UPDATE expense
export const updateExpense = async (id, updateData) => {
  try {
    const expenseRef = doc(db, 'expenses', id);
    const dataToUpdate = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    if (updateData.amount !== undefined) {
      dataToUpdate.amount = parseFloat(updateData.amount);
    }
    
    await updateDoc(expenseRef, dataToUpdate);
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to update expense");
  }
};

// DELETE expense
export const deleteExpense = async (id) => {
  try {
    const expenseRef = doc(db, 'expenses', id);
    await deleteDoc(expenseRef);
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to delete expense");
  }
};

// FETCH expenses by category
export const fetchExpensesByCategory = async (category) => {
  try {
    const q = query(
      collection(db, 'expenses'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(error.message || "Failed to fetch expenses by category");
  }
};