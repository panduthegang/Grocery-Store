import { 
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Order, OrderItem } from '../types/order';

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order. Please try again.');
  }
};

const convertFirestoreOrder = (doc: QueryDocumentSnapshot<DocumentData>): Order => {
  const data = doc.data();
  return {
    id: doc.id,
    userId: data.userId,
    items: data.items,
    total: data.total,
    status: data.status,
    createdAt: data.createdAt,
    customerInfo: data.customerInfo,
    paymentMethod: data.paymentMethod
  };
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertFirestoreOrder);
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders. Please try again later.');
  }
};