import { Order } from '@/lib/types/order';

const ORDERS_STORAGE_KEY = 'exzort_orders';

export const saveOrder = (order: Order): void => {
  if (typeof window === 'undefined') return;
  
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  
  const ordersData = localStorage.getItem(ORDERS_STORAGE_KEY);
  return ordersData ? JSON.parse(ordersData) : [];
};

export const getOrderByNumber = (orderNumber: string): Order | null => {
  const orders = getOrders();
  return orders.find(order => order.orderNumber === orderNumber) || null;
};

export const getOrdersByEmail = (email: string): Order[] => {
  const orders = getOrders();
  return orders.filter(order => order.customer.email.toLowerCase() === email.toLowerCase());
};

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

export const generateTrackingNumber = (): string => {
  const random = Math.random().toString(36).substring(2, 15).toUpperCase();
  return `TRK${random}`;
};
