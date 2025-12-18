'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOrders } from '@/lib/orderStorage';
import { Order } from '@/lib/types/order';
import Button from '@/components/Button';
import { Package, Search, ArrowRight, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allOrders = getOrders();
    setOrders(allOrders);
    setFilteredOrders(allOrders);
    setLoading(false);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchEmail.trim()) {
      const filtered = orders.filter(order => 
        order.customer.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
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
      month: 'short',
      day: 'numeric',
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

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <Package className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              Track Orders
            </h1>
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            View and track all your orders
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mb-8 animate-fade-in">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="Search by email address..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="w-12 h-12 border-4 border-neutral-200 dark:border-neutral-800 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-24 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <Package className="h-10 w-10 text-neutral-400" />
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
              {searchEmail ? 'No orders found' : 'No orders yet'}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              {searchEmail 
                ? 'Try searching with a different email address'
                : 'Orders will appear here once you make a purchase'
              }
            </p>
            <Link href="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((order, index) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <Link 
                  key={order.id} 
                  href={`/orders/${order.orderNumber}`}
                  className="block animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-300 hover:-translate-y-1 group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-black dark:text-white">
                            Order #{order.orderNumber}
                          </h3>
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
                            <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                            <span className={`text-sm font-medium ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <span>{formatDate(order.date)}</span>
                          <span>•</span>
                          <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                          <span>•</span>
                          <span>{order.customer.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-black dark:text-white">
                            {formatPrice(order.total, order.currency)}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Info Section */}
        {filteredOrders.length > 0 && (
          <div className="mt-12 p-6 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl animate-fade-in">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <strong className="text-black dark:text-white">Note:</strong> This is a demo store. No real payments are processed. 
              Orders are stored locally in your browser.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
