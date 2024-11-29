'use client';

import { useState, useEffect } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (contactNumber: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactNumber.trim()) {
      setError('Contact number is required');
      return;
    }
    
    if (!/^\d{10}$/.test(contactNumber)) {
      setError('Please enter a valid 10-digit contact number');
      return;
    }

    onLogin(contactNumber);
    setContactNumber('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-200
        ${isClosing ? 'bg-opacity-0' : 'bg-opacity-50 animate-overlay-fade'}`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-200
          ${isClosing ? 'opacity-0 translate-y-2' : 'animate-modal-slide'}
        `}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Login</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value);
                setError('');
              }}
              placeholder="Enter your 10-digit number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
              maxLength={10}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600 animate-modal-slide">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-all hover:shadow-lg active:scale-[0.98]"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
