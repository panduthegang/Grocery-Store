import { 
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  FirestoreError
} from 'firebase/firestore';
import { db } from './config';
import { Order } from '../../types/order';

const COLLECTIONS = {
  ORDERS: 'orders',
  PRODUCTS: 'products',
  CATEGORIES: 'categories'
} as const;

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
  try {
    // Validate order data before creating
    if (!orderData.userId || !orderData.items || !orderData.total) {
      throw new Error('Invalid order data');
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.ORDERS), {
      ...orderData,
      createdAt: serverTimestamp(),
      status: orderData.status || 'pending'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    if (error instanceof FirestoreError) {
      if (error.code === 'permission-denied') {
        throw new Error('You do not have permission to create orders');
      }
    }
    throw error;
  }
};

const convertFirestoreOrder = (doc: QueryDocumentSnapshot<DocumentData>): Order => {
  const data = doc.data();
  
  // Ensure all required fields are present
  if (!data.userId || !data.items || !data.total) {
    throw new Error(`Invalid order data for order ${doc.id}`);
  }

  return {
    id: doc.id,
    userId: data.userId,
    items: data.items,
    total: data.total,
    status: data.status || 'pending',
    createdAt: data.createdAt || null,
    customerInfo: data.customerInfo,
    paymentMethod: data.paymentMethod
  };
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  if (!userId) {
    throw new Error('User ID is required to fetch orders');
  }

  try {
    const ordersRef = collection(db, COLLECTIONS.ORDERS);
    const q = query(
      ordersRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    // Log the raw data for debugging
    console.log('Raw orders data:', querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    
    return querySnapshot.docs.map(convertFirestoreOrder);
  } catch (error) {
    console.error('Error fetching orders:', error);
    if (error instanceof FirestoreError) {
      if (error.code === 'failed-precondition') {
        throw new Error('Please wait while we set up the database indexes');
      }
      if (error.code === 'permission-denied') {
        throw new Error('You do not have permission to view these orders');
      }
    }
    throw error;
  }
};