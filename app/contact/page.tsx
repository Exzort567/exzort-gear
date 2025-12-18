"use client";

import { useState } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import Button from "@/components/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in stagger-1">
              <div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-black dark:text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-black dark:text-white mb-1">Email</p>
                      <a href="mailto:quibelkenneth@gmail.com" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                        quibelkenneth@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-black dark:text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-black dark:text-white mb-1">Location</p>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Available for Remote Work
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h1 className="font-bold text-black dark:text-white mb-2 text-2xl">
                  Looking for a developer?
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-lg leading-relaxed">
                  I specialize in building high-performance e-commerce applications with Next.js and Shopify.
                </p>
                <div className="flex gap-2">
                  <div className="px-3 py-1 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-md font-medium text-neutral-600 dark:text-neutral-400">
                    Next.js
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-md font-medium text-neutral-600 dark:text-neutral-400">
                    Shopify
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-md font-medium text-neutral-600 dark:text-neutral-400">
                    React
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in stagger-2">
              <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>

                {submitStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
                    ✗ Failed to send message. Please try again or email me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
