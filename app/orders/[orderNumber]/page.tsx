'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getOrderByNumber } from '@/lib/orderStorage';
import { Order } from '@/lib/types/order';
import Button from '@/components/Button';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Copy, Check, XCircle } from 'lucide-react';

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderNumber = params.orderNumber as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      const foundOrder = getOrderByNumber(orderNumber);
      setOrder(foundOrder);
      setLoading(false);
    }
  }, [orderNumber]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusInfo = (status: Order['status']) => {
    const statusMap = {
      pending: {
        icon: Clock,
        color: 'text-yellow-600 dark:text-yellow-400',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        label: 'Pending',
      },
      processing: {
        icon: Package,
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        label: 'Processing',
      },
      shipped: {
        icon: Truck,
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        label: 'Shipped',
      },
      delivered: {
        icon: CheckCircle,
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        label: 'Delivered',
      },
      cancelled: {
        icon: XCircle,
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        label: 'Cancelled',
      },
    };
    return statusMap[status];
  };

  const getOrderTimeline = (status: Order['status']) => {
    const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(status);
    
    return statuses.map((s, index) => ({
      status: s,
      completed: index <= currentIndex && status !== 'cancelled',
      active: index === currentIndex,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-neutral-200 dark:border-neutral-800 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <Package className="h-10 w-10 text-neutral-400" />
            </div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
              Order Not Found
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              We couldn't find an order with number: <strong>{orderNumber}</strong>
            </p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;
  const timeline = getOrderTimeline(order.status);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link 
          href="/products" 
          className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors mb-8 group animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Continue Shopping
        </Link>

        {/* Order Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              Order Details
            </h1>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusInfo.bgColor}`}>
              <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
              <span className={`font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <span className="text-neutral-600 dark:text-neutral-400">Order #</span>
              <span className="font-bold text-black dark:text-white">{order.orderNumber}</span>
              <button
                onClick={() => copyToClipboard(order.orderNumber)}
                className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-neutral-400" />
                )}
              </button>
            </div>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-600 dark:text-neutral-400">
              Placed on {formatDate(order.date)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Timeline */}
            <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl animate-fade-in">
              <h2 className="text-xl font-bold text-black dark:text-white mb-6">Order Timeline</h2>
              <div className="space-y-6">
                {timeline.map((item, index) => {
                  const info = getStatusInfo(item.status);
                  const Icon = info.icon;
                  return (
                    <div key={item.status} className="flex items-start gap-4">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          item.completed ? info.bgColor : 'bg-neutral-100 dark:bg-neutral-800'
                        }`}>
                          <Icon className={`h-6 w-6 ${
                            item.completed ? info.color : 'text-neutral-400'
                          }`} />
                        </div>
                        {index < timeline.length - 1 && (
                          <div className={`absolute left-1/2 top-12 w-0.5 h-6 -translate-x-1/2 ${
                            item.completed ? 'bg-neutral-300 dark:bg-neutral-700' : 'bg-neutral-200 dark:bg-neutral-800'
                          }`} />
                        )}
                      </div>
                      <div className="pt-2">
                        <h3 className={`font-semibold ${
                          item.completed ? 'text-black dark:text-white' : 'text-neutral-400'
                        }`}>
                          {info.label}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-500">
                          {item.completed && 'Completed'}
                          {item.active && !item.completed && 'In progress'}
                          {!item.completed && !item.active && 'Pending'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tracking Information */}
            {order.trackingNumber && order.status !== 'pending' && (
              <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl animate-fade-in">
                <h2 className="text-xl font-bold text-black dark:text-white mb-4">Tracking Information</h2>
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Tracking Number</p>
                    <p className="font-bold text-black dark:text-white">{order.trackingNumber}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(order.trackingNumber!)}
                    className="p-3 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors"
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <Copy className="h-5 w-5 text-neutral-400" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl animate-fade-in">
              <h2 className="text-xl font-bold text-black dark:text-white mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
                    {item.image && (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-200 dark:bg-neutral-700">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-black dark:text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-black dark:text-white">
                        {formatPrice(item.price * item.quantity, order.currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="sticky top-24 p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl animate-fade-in">
              <h2 className="text-xl font-bold text-black dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-3 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                  <span className="text-black dark:text-white">{formatPrice(order.subtotal, order.currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Tax</span>
                  <span className="text-black dark:text-white">{formatPrice(order.tax, order.currency)}</span>
                </div>
              </div>

              <div className="pt-6 mb-6">
                <div className="flex justify-between text-xl font-bold text-black dark:text-white">
                  <span>Total</span>
                  <span>{formatPrice(order.total, order.currency)}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h3 className="font-semibold text-black dark:text-white mb-4">Shipping Address</h3>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <p className="font-medium text-black dark:text-white">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 mt-6">
                <h3 className="font-semibold text-black dark:text-white mb-2">Contact</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{order.customer.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
