"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, CheckCircle2, ShieldUser } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  budgetRange: z.enum(['< ₹10 Lakhs', '₹10 Lakhs - ₹1 Cr', '₹1 Cr - ₹10 Cr', '₹10 Cr+'], {
    message: 'Please select a budget range',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function LandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setServerError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'flex-end', position: 'absolute', width: '100%', zIndex: 10 }}>
        <Link href="/admin/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} className="hover:text-white">
          <ShieldUser size={18} />
          Admin Login
        </Link>
      </header>

      <main className="landing-page" style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '10%', left: '5%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'var(--primary-glow)', filter: 'blur(100px)', zIndex: -1 }}
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.12, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '10%', right: '5%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.3)', filter: 'blur(100px)', zIndex: -1 }}
        />

        <div className="landing-content">
          {/* Left Side: Hero Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="hero-text"
          >
            <motion.h1 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Scale your business with <span className="text-gradient">LeadDesk Mini</span>
            </motion.h1>
            <motion.p 
              className="text-muted mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              The easiest way to capture, track, and close deals. Join thousands of high-performing teams converting more leads today.
            </motion.p>
            <motion.div 
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={20} className="text-gradient" />
                <span className="text-muted">Instant Setup</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={20} className="text-gradient" />
                <span className="text-muted">No Credit Card</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.2 }}
            className="glass-card"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center" 
                  style={{ padding: '2rem 0' }}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}
                  >
                    <CheckCircle2 size={72} style={{ color: 'var(--success-color)' }} />
                  </motion.div>
                  <h2 className="mb-4">You're on the list!</h2>
                  <p className="text-muted mb-6">We've received your request and will be in touch shortly.</p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary" 
                    onClick={() => setIsSuccess(false)}
                  >
                    Submit Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="mb-2">Get Started Now</h2>
                  <p className="text-muted mb-6">Fill out the form below and we'll reach out.</p>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="John Doe"
                        {...register('name')}
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="error-text">{errors.name.message}</motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-input"
                          placeholder="john@company.com"
                          {...register('email')}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="error-text">{errors.email.message}</motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-input"
                          placeholder="+1 (555) 000-0000"
                          {...register('phone')}
                        />
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="error-text">{errors.phone.message}</motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Budget Range</label>
                      <select className="form-select" {...register('budgetRange')}>
                        <option value="">Select your budget</option>
                        <option value="< ₹10 Lakhs">&lt; ₹10 Lakhs</option>
                        <option value="₹10 Lakhs - ₹1 Cr">₹10 Lakhs - ₹1 Cr</option>
                        <option value="₹1 Cr - ₹10 Cr">₹1 Cr - ₹10 Cr</option>
                        <option value="₹10 Cr+">₹10 Cr+</option>
                      </select>
                      <AnimatePresence>
                        {errors.budgetRange && (
                          <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="error-text">{errors.budgetRange.message}</motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="form-group">
                      <label className="form-label">How can we help?</label>
                      <textarea
                        className="form-textarea"
                        placeholder="Tell us about your project..."
                        {...register('message')}
                      ></textarea>
                      <AnimatePresence>
                        {errors.message && (
                          <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="error-text">{errors.message.message}</motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <AnimatePresence>
                      {serverError && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-4 p-3 rounded" 
                          style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', borderRadius: '8px', padding: '1rem', border: '1px solid rgba(239,68,68,0.2)' }}
                        >
                          {serverError}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="btn-primary" 
                      disabled={isSubmitting}
                      style={{ marginTop: '0.5rem' }}
                    >
                      {isSubmitting ? <span className="spinner"></span> : 'Send Request'}
                      {!isSubmitting && <ArrowRight size={20} />}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>
    </>
  );
}
