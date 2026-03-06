import { useState } from 'react';
import { useStore } from '../store/useStore';
import { LogOut, Package, Heart, MapPin, ChevronRight, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-serif text-stone-800 mb-2">Not logged in</h2>
        <p className="text-stone-500 mb-6">Login to view your profile and order history.</p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-stone-900 text-white px-8 py-3 rounded-full font-medium hover:bg-black transition-colors"
        >
          Login
        </button>
      </div>
    );
  }

  const menuItems = [
    { icon: Package, label: 'My Orders', value: '3 orders' },
    { icon: Heart, label: 'Saved Bouquets', value: '2 saved' },
    { icon: MapPin, label: 'Saved Addresses', value: 'Home, Work' },
    { icon: Settings, label: 'Settings', value: '' },
  ];

  return (
    <div className="h-full bg-white">
      <header className="bg-white px-6 py-8 border-b border-stone-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-700 font-serif text-2xl">
            {user.name?.[0] || 'U'}
          </div>
          <div>
            <h1 className="font-serif text-xl text-stone-800">{user.name}</h1>
            <p className="text-stone-500 text-sm">{user.phone}</p>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          {menuItems.map((item, i) => (
            <button 
              key={item.label}
              className={`w-full flex items-center justify-between p-4 hover:bg-stone-100 transition-colors ${i !== menuItems.length - 1 ? 'border-b border-stone-100' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-500">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-stone-700">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-400">
                <span className="text-sm">{item.value}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>

        <button 
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-600 py-4 rounded-xl font-medium hover:bg-rose-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </main>
    </div>
  );
}
