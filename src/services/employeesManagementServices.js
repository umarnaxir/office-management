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

// Employee types
const EMPLOYEE_TYPES = {
  FULL_TIME: 'full_time',
  INTERN: 'intern'
};

// CREATE employee
export const addEmployee = async (employeeData) => {
  try {
    const dataToStore = {
      ...employeeData,
      type: employeeData.type || EMPLOYEE_TYPES.FULL_TIME,
      salary: parseFloat(employeeData.salary),
      joiningDate: new Date(employeeData.joiningDate).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };
    
    const docRef = await addDoc(collection(db, 'employees'), dataToStore);
    return docRef.id;
  } catch (error) {
    throw new Error(`Failed to add employee: ${error.message}`);
  }
};

// FETCH all employees
export const fetchEmployees = async (type = null) => {
  try {
    let q;
    if (type) {
      q = query(
        collection(db, 'employees'), 
        where('type', '==', type),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'employees'), 
        orderBy('createdAt', 'desc')
      );
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data(),
      joiningDate: doc.data().joiningDate.split('T')[0] // Format date for display
    }));
  } catch (error) {
    throw new Error(error.message || "Failed to fetch employees");
  }
};

// UPDATE employee
export const updateEmployee = async (id, updateData) => {
  try {
    const employeeRef = doc(db, 'employees', id);
    const dataToUpdate = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    if (updateData.salary !== undefined) {
      dataToUpdate.salary = parseFloat(updateData.salary);
    }
    if (updateData.joiningDate !== undefined) {
      dataToUpdate.joiningDate = new Date(updateData.joiningDate).toISOString();
    }
    
    await updateDoc(employeeRef, dataToUpdate);
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to update employee");
  }
};

// DELETE employee (soft delete)
export const deleteEmployee = async (id) => {
  try {
    const employeeRef = doc(db, 'employees', id);
    await updateDoc(employeeRef, {
      isActive: false,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to delete employee");
  }
};

// PROMOTE intern to full-time employee
export const promoteIntern = async (id, promotionData) => {
  try {
    const employeeRef = doc(db, 'employees', id);
    await updateDoc(employeeRef, {
      type: EMPLOYEE_TYPES.FULL_TIME,
      ...promotionData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to promote intern");
  }
};

// FETCH employees by department
export const fetchEmployeesByDepartment = async (department) => {
  try {
    const q = query(
      collection(db, 'employees'),
      where('department', '==', department),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data(),
      joiningDate: doc.data().joiningDate.split('T')[0]
    }));
  } catch (error) {
    throw new Error(error.message || "Failed to fetch employees by department");
  }
};

// FETCH department statistics
export const fetchDepartmentStats = async () => {
  try {
    const q = query(
      collection(db, 'employees'),
      where('isActive', '==', true)
    );
    
    const snapshot = await getDocs(q);
    const stats = {
      departments: {},
      totalEmployees: 0,
      totalInterns: 0
    };
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.type === EMPLOYEE_TYPES.INTERN) {
        stats.totalInterns++;
      } else {
        stats.totalEmployees++;
      }
      
      if (data.department) {
        stats.departments[data.department] = (stats.departments[data.department] || 0) + 1;
      }
    });
    
    return stats;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch department stats");
  }
};