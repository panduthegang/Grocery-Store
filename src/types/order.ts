export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed';
  createdAt: {
    toDate?: () => Date;
    seconds?: number;
    nanoseconds?: number;
  };
  customerInfo: CustomerInfo;
  paymentMethod: 'cod' | 'upi' | 'card';
}