'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  Sprout,
  TrendingUp,
  ShieldAlert,
  Landmark,
  Tractor,
  FileCheck2,
  Users,
  Compass,
  Sparkles,
  ArrowUpRight,
  Droplets,
  Sun,
  Activity,
  Layers,
  BookOpen
} from 'lucide-react';
import { useNotificationStore } from '../notification page/store';

interface FeatureCard {
  title: string;
  category: string;
  description: string;
  href: string;
  icon: any;
  badge?: string;
  accentColor: string;
  bgGradient: string;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    title: 'Real-Time Crop Monitor & IoT',
    category: 'Field Intelligence',
    description: 'Live soil moisture, NDVI stress scoring, and AI agronomist advisories powered by satellite & IoT sensors.',
    href: '/crop-monitoring',
    icon: Sprout,
    badge: 'Live Telemetry',
    accentColor: 'text-emerald-600',
    bgGradient: 'from-emerald-500/10 to-teal-500/5',
  },
  {
    title: 'Market Mandi Prices & Calculator',
    category: 'Market & Logistics',
    description: 'Live Agmarknet mandi prices, transport freight deductions, and net realization comparisons across APMCs.',
    href: '/market',
    icon: TrendingUp,
    badge: 'Live Rates',
    accentColor: 'text-amber-600',
    bgGradient: 'from-amber-500/10 to-yellow-500/5',
  },
  {
    title: 'Crop Insurance (PMFBY)',
    category: 'Risk Mitigation',
    description: 'Instant claims registration, subsidized premiums under PMFBY, and real-time distress payouts.',
    href: '/insurance',
    icon: ShieldAlert,
    badge: 'Govt. Backed',
    accentColor: 'text-rose-600',
    bgGradient: 'from-rose-500/10 to-orange-500/5',
  },
  {
    title: 'Agricultural Financial Facilities',
    category: 'Credit & Loans',
    description: 'Discover verified crop loans, Kisan credit lines, and machinery finance from partner banks.',
    href: '/financial-support/list',
    icon: Landmark,
    badge: 'Bank Verified',
    accentColor: 'text-blue-600',
    bgGradient: 'from-blue-500/10 to-indigo-500/5',
  },
  {
    title: 'Equipment Rental Directory',
    category: 'Custom Hiring',
    description: 'Rent verified tractors, combine harvesters, power sprayers, and seed drills with driver support.',
    href: '/equipment',
    icon: Tractor,
    badge: 'Local Fleet',
    accentColor: 'text-purple-600',
    bgGradient: 'from-purple-500/10 to-pink-500/5',
  },
  {
    title: 'Government Equipment Schemes',
    category: 'Subsidies & DBT',
    description: 'Explore 40-70% subsidy schemes on modern farming implements under SMAM and PMKSY.',
    href: '/government-equipment-schemes',
    icon: FileCheck2,
    badge: '40-70% Off',
    accentColor: 'text-teal-600',
    bgGradient: 'from-teal-500/10 to-emerald-500/5',
  },
  {
    title: 'Alternative Crop Recommendations',
    category: 'Crop Switching',
    description: 'Mitigate rainfall deficits by switching to high-value, drought-tolerant alternatives like mustard & pulses.',
    href: '/alternative-crop',
    icon: Compass,
    badge: 'AI Powered',
    accentColor: 'text-cyan-600',
    bgGradient: 'from-cyan-500/10 to-sky-500/5',
  },
  {
    title: 'Crop Cultivation & Sowing Guide',
    category: 'Agronomy Database',
    description: 'Standard NPK fertilizer schedules, optimal spacing, seed rates, and critical irrigation stages.',
    href: '/crop-details',
    icon: Layers,
    badge: 'Field Guide',
    accentColor: 'text-lime-600',
    bgGradient: 'from-lime-500/10 to-emerald-500/5',
  },
  {
    title: 'Full Crop Lifecycle Playbook',
    category: 'Lifecycle Protocol',
    description: 'Interactive step-by-step master playbook from nursery soil preparation to grain harvest & storage.',
    href: '/full-crop-guide',
    icon: BookOpen,
    badge: '4 Stages',
    accentColor: 'text-indigo-600',
    bgGradient: 'from-indigo-500/10 to-purple-500/5',
  },
  {
    title: 'Farmer Precision Profile',
    category: 'Farm Identity',
    description: 'Digital land parcels, multilingual advisory preferences, and biometric KYC verification.',
    href: '/farmer-profile',
    icon: Users,
    badge: 'Verified',
    accentColor: 'text-emerald-700',
    bgGradient: 'from-emerald-600/10 to-teal-600/5',
  },
  {
    title: 'Bank Partner Portal',
    category: 'Institutional',
    description: 'Bank portal to publish agricultural credit facilities, review applications, and update interest terms.',
    href: '/bank-portal',
    icon: Landmark,
    badge: 'Bank Admin',
    accentColor: 'text-slate-700',
    bgGradient: 'from-slate-600/10 to-zinc-600/5',
  },
  {
    title: 'Agriculture Officer Command Center',
    category: 'District Administration',
    description: 'Spatial district distress map, priority farmer triage, and emergency field intervention feeds.',
    href: '/officer-dashboard',
    icon: Activity,
    badge: 'Admin GIS',
    accentColor: 'text-red-700',
    bgGradient: 'from-red-600/10 to-amber-600/5',
  },
];

export default function FarmerDashboard() {
  const unreadCount = useNotificationStore((state: any) =>
    typeof state.unreadCount === 'function' ? state.unreadCount() : 3
  );

  return (
    <div className="min-h-screen bg-[#F4F6F0] text-slate-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-900/10 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
            🌾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">Smart Crop</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300/60">
                Farm OS
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">Welcome back, Ramesh · Mayurbhanj, Odisha</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/notifications"
            className="relative p-2.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 transition-all border border-slate-200"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link
            href="/farmer-profile"
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              RM
            </div>
            <span className="text-xs font-bold text-slate-800 hidden sm:inline">Ramesh</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
        {/* Quick Intelligence Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              AI Precision Farm Intelligence
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
              Crop Telemetry, Mandi Arbitrage &amp; Subsidies
            </h1>
            <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed">
              Your comprehensive agricultural decision suite. Monitor paddy crop stress in real time, compare mandi net realization rates, and access DBT subsidies.
            </p>
          </div>

          {/* Quick Realtime Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200">
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                Weather
              </div>
              <div className="text-lg font-extrabold mt-1">29°C · Clear</div>
              <div className="text-[10px] text-emerald-300 font-medium">Baripada, Odisha</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200">
                <Droplets className="w-3.5 h-3.5 text-blue-300" />
                Soil Moisture
              </div>
              <div className="text-lg font-extrabold mt-1">62% (Optimal)</div>
              <div className="text-[10px] text-emerald-300 font-medium">NASA POWER live</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                Paddy Mandi
              </div>
              <div className="text-lg font-extrabold mt-1">₹2,380 / Qtl</div>
              <div className="text-[10px] text-emerald-300 font-medium">+₹80 above MSP</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-300" />
                Crop Stress
              </div>
              <div className="text-lg font-extrabold mt-1 text-emerald-300">Low Risk</div>
              <div className="text-[10px] text-emerald-300 font-medium">NDVI 0.72 index</div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-extrabold text-slate-600 uppercase tracking-wider">
              All Modules &amp; Applications
            </h2>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              12 Integrated Modules
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {FEATURE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {card.category}
                      </span>
                      {card.badge && (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
                          {card.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-3.5 mb-2">
                      <div className={`p-2.5 rounded-xl bg-slate-100/80 group-hover:scale-110 transition-transform ${card.accentColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mt-1">
                      {card.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 mt-4 pt-3 border-t border-slate-100 group-hover:translate-x-1 transition-transform">
                    <span>Open Module</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white/70 py-6 px-4 text-center text-xs text-slate-500 font-medium">
        <p>Smart Crop © 2026 · Ministry of Agriculture &amp; Farmers Welfare, Govt. of Odisha</p>
      </footer>
    </div>
  );
}
