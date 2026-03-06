import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ArrowLeft, MapPin, Clock, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Checkout() {
  const { bouquet, bouquetStyle, wrapping, deliverySpeed, setDeliverySpeed, totalPrice, clearBouquet, aiPreviewApproved, sizeCategory } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'summary' | 'address' | 'payment' | 'success'>('summary');
  const [isProcessing, setIsProcessing] = useState(false);

  const size = sizeCategory();
  const flowersTotal = bouquet.reduce((sum, item) => sum + item.flower.price * item.quantity, 0);
  
  const wrappingMultiplier = size === 'small' ? 1 : size === 'medium' ? 1.2 : size === 'large' ? 1.5 : 2;
  const wrappingTotal = (wrapping?.price || 0) * wrappingMultiplier;
  
  const deliveryBase = deliverySpeed === 'express' ? 150 : 50;
  const deliveryHandling = (size === 'large' || size === 'grand') ? 50 : 0;
  const deliveryTotal = deliveryBase + deliveryHandling;

  const baseMakingCharge = bouquetStyle === 'flat_layered' ? 100 : 50;
  const sizeMultiplier = size === 'small' ? 1 : size === 'medium' ? 1.5 : size === 'large' ? 2 : 3;
  const makingCharge = baseMakingCharge * sizeMultiplier;

  const total = totalPrice();

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      clearBouquet();
    }, 2000);
  };

  if (bouquet.length === 0 && step !== 'success') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
          <CreditCard className="w-10 h-10 text-stone-400" />
        </div>
        <h2 className="text-xl font-serif text-stone-800 mb-2">Your cart is empty</h2>
        <p className="text-stone-500 mb-6">Start building your custom bouquet to proceed to checkout.</p>
        <button 
          onClick={() => navigate('/builder')}
          className="bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors"
        >
          Build a Bouquet
        </button>
      </div>
    );
  }

  if (!aiPreviewApproved && step !== 'success') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-stone-400" />
        </div>
        <h2 className="text-xl font-serif text-stone-800 mb-2">Preview Required</h2>
        <p className="text-stone-500 mb-6">Please generate and approve an AI preview of your bouquet before proceeding to checkout.</p>
        <button 
          onClick={() => navigate('/ai-preview')}
          className="bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors"
        >
          Go to AI Preview
        </button>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-white">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="w-24 h-24 bg-stone-900 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-stone-200"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-3xl font-serif text-stone-800 mb-2">Order Confirmed!</h2>
        <p className="text-stone-600 mb-8 max-w-xs">
          Your custom bouquet is being prepared. We'll notify you when it's out for delivery.
        </p>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 w-full max-w-sm mb-8">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-stone-100">
            <span className="text-stone-500">Order ID</span>
            <span className="font-mono font-medium text-stone-800">#BLM-{Math.floor(Math.random() * 10000)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-500">Estimated Delivery</span>
            <span className="font-medium text-stone-900">
              {deliverySpeed === 'express' ? 'Today, 2:00 PM' : 'Tomorrow, 10:00 AM'}
            </span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-colors w-full max-w-sm"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <header className="px-6 py-4 flex items-center gap-4 bg-white border-b border-stone-200 sticky top-0 z-10">
        <button 
          onClick={() => {
            if (step === 'payment') setStep('address');
            else if (step === 'address') setStep('summary');
            else navigate('/builder');
          }}
          className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-stone-600" />
        </button>
        <h1 className="font-serif text-xl text-stone-800">
          {step === 'summary' ? 'Order Summary' : step === 'address' ? 'Delivery' : 'Payment'}
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        {step === 'summary' && (
          <div className="space-y-6">
            {/* Items */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
              <h3 className="font-medium text-stone-800 mb-4">Bouquet Items</h3>
              <div className="space-y-4">
                {bouquet.map((item) => (
                  <div key={item.flower.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center text-xs font-medium text-stone-500">
                        {item.quantity}x
                      </div>
                      <span className="text-sm text-stone-700">{item.flower.name}</span>
                    </div>
                    <span className="text-sm font-medium text-stone-800">
                      ₹{(item.flower.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                ))}
                {wrapping && (
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center text-xs font-medium text-stone-500">
                        1x
                      </div>
                      <span className="text-sm text-stone-700">Wrapping: {wrapping.name}</span>
                    </div>
                    <span className="text-sm font-medium text-stone-800">
                      ₹{wrapping.price.toFixed(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Speed */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
              <h3 className="font-medium text-stone-800 mb-4">Delivery Speed</h3>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${deliverySpeed === 'standard' ? 'border-stone-900 bg-stone-50' : 'border-stone-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliverySpeed === 'standard' ? 'border-stone-900' : 'border-stone-300'}`}>
                      {deliverySpeed === 'standard' && <div className="w-2.5 h-2.5 bg-stone-900 rounded-full" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-800">Standard Delivery</p>
                      <p className="text-xs text-stone-500">Tomorrow, 9 AM - 6 PM</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-stone-800">₹50</span>
                </label>
                
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${deliverySpeed === 'express' ? 'border-stone-900 bg-stone-50' : 'border-stone-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliverySpeed === 'express' ? 'border-stone-900' : 'border-stone-300'}`}>
                      {deliverySpeed === 'express' && <div className="w-2.5 h-2.5 bg-stone-900 rounded-full" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-800">Express Delivery</p>
                      <p className="text-xs text-stone-600 font-medium">Today within 3 hours</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-stone-800">₹150</span>
                </label>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 space-y-3">
              <div className="flex justify-between text-sm text-stone-500">
                <span>Subtotal</span>
                <span>₹{flowersTotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-500">
                <span>Making Charges ({bouquetStyle === 'round' ? 'Round' : 'Flat Layered'})</span>
                <span>₹{makingCharge.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-500">
                <span>Wrapping</span>
                <span>₹{wrappingTotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-500">
                <span>Delivery</span>
                <span>₹{deliveryTotal.toFixed(0)}</span>
              </div>
              <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
                <span className="font-medium text-stone-800">Total</span>
                <span className="text-xl font-bold text-stone-900">₹{total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        )}

        {step === 'address' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
              <h3 className="font-medium text-stone-800 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-stone-900" />
                Delivery Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">Recipient Name</label>
                  <input type="text" defaultValue="Jane Doe" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">Street Address</label>
                  <input type="text" defaultValue="123 Floral Lane, Apt 4B" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">City</label>
                    <input type="text" defaultValue="San Francisco" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">Zip Code</label>
                    <input type="text" defaultValue="94105" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-stone-100 rounded-2xl p-5 border border-stone-200 flex gap-3">
              <Clock className="w-5 h-5 text-stone-900 flex-shrink-0" />
              <p className="text-sm text-stone-800">
                Your order will be delivered {deliverySpeed === 'express' ? 'within 3 hours of payment confirmation.' : 'tomorrow between 9 AM and 6 PM.'}
              </p>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
              <h3 className="font-medium text-stone-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-stone-900" />
                Payment Method
              </h3>
              
              <div className="space-y-3 mb-6">
                <label className="flex items-center justify-between p-4 rounded-xl border-2 border-stone-900 bg-stone-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-stone-900 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-stone-900 rounded-full" />
                    </div>
                    <span className="text-sm font-medium text-stone-800">Credit / Debit Card</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-8 h-5 bg-stone-200 rounded" />
                    <div className="w-8 h-5 bg-stone-200 rounded" />
                  </div>
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">CVC</label>
                    <input type="text" placeholder="123" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 font-mono" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-stone-900 rounded-2xl p-5 text-white flex justify-between items-center shadow-lg">
              <span className="text-stone-300">Total to pay</span>
              <span className="text-2xl font-bold">₹{total.toFixed(0)}</span>
            </div>
          </div>
        )}
      </main>

      <footer className="p-6 bg-white border-t border-stone-200">
        <button 
          onClick={() => {
            if (step === 'summary') setStep('address');
            else if (step === 'address') setStep('payment');
            else handlePayment();
          }}
          disabled={isProcessing}
          className="w-full bg-stone-900 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-70 shadow-lg shadow-stone-900/20"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {step === 'summary' ? 'Continue to Delivery' : step === 'address' ? 'Continue to Payment' : `Pay ₹${total.toFixed(0)}`}
              {step !== 'payment' && <ChevronRight className="w-4 h-4" />}
            </>
          )}
        </button>
      </footer>
    </div>
  );
}
