'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCart } from '@/lib/hooks/useCart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isSearchPage = pathname === '/search';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search bar when navigating to a different page (not search page)
  useEffect(() => {
    if (!isSearchPage && isSearchOpen) {
      setIsSearchOpen(false);
    }
  }, [pathname, isSearchPage]);

  // Initialize search query from URL params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [searchParams]);

  // Debounced search - triggers search automatically as user types
  useEffect(() => {
    if (!isSearchOpen) return;

    const timer = setTimeout(() => {
      // Only navigate if we're not already on search page with same query
      const currentQuery = searchParams.get('q') || '';
      const newQuery = searchQuery.trim();
      
      if (newQuery !== currentQuery) {
        if (!isSearchPage) {
          // Navigate to search page with query
          router.push(`/search${newQuery ? `?q=${encodeURIComponent(newQuery)}` : ''}`);
        } else {
          // Already on search page, just update URL params without full navigation
          const url = new URL(window.location.href);
          if (newQuery) {
            url.searchParams.set('q', newQuery);
          } else {
            url.searchParams.delete('q');
          }
          window.history.replaceState({}, '', url.toString());
          // Trigger a soft refresh to update search results
          router.replace(url.pathname + url.search);
        }
      }
    }, 400); // Increased from 300ms to 400ms for smoother typing

    return () => clearTimeout(timer);
  }, [searchQuery, router, isSearchOpen, isSearchPage, searchParams]);

  // Close menu when clicking outside
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-sm border-b border-neutral-200/50 dark:border-neutral-800/50' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-xl font-bold text-black dark:text-white transition-transform hover:scale-105"
            >
              Exzort<span className="text-neutral-400">Gear</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              {['Products', 'Collections', 'About'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase()}`} 
                  className="relative text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-3 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link 
                href="/cart" 
                className="relative p-3 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs flex items-center justify-center font-bold animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-3 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Search Bar - Animated dropdown */}
        <div 
          className={`overflow-hidden transition-all duration-300 ${
            isSearchOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="w-full max-w-2xl mx-auto">
              <input
                type="search"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-6 py-4 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-300"
                autoFocus={isSearchOpen}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800 transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col p-8 pt-24">
            {['Products', 'Collections', 'About', 'Cart'].map((item, index) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-medium text-black dark:text-white py-4 border-b border-neutral-100 dark:border-neutral-900 hover:text-neutral-500 transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
