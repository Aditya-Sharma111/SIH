'use client';

import React from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '../notification page/store';

export default function FarmerDashboard() {
  const unreadCount = useNotificationStore((state: any) => state.unreadCount());

  return (
    <div className="min-h-screen bg-[#F2F2EF] flex flex-col">
      {/* Farmer Dashboard Header */}
      <header className="glass flex items-center justify-between px-6 py-4 text-[#1A1A1A]">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Smart Crop Farmer Dashboard</h1>
          <span className="text-xs font-medium text-gray-500">Welcome back, Ramesh</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/notifications" 
            className="relative p-2 rounded-full hover:bg-white/40 transition-colors"
          >
            <Bell className="w-6 h-6 text-[#1A1A1A]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
            )}
          </Link>
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold">
            RM
          </div>
        </div>
      </header>
      
      {/* Dashboard Content Placeholder */}
      <main className="flex-1 p-6 flex items-center justify-center">
        <p className="text-gray-500">Farmer Dashboard Content</p>
      </main>
    </div>
  );
}
