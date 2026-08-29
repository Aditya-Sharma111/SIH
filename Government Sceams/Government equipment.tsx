'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Landmark, CheckCircle, ExternalLink, ShieldCheck, FileText, IndianRupee } from 'lucide-react';

interface GovtScheme {
  id: string;
  name: string;
  department: string;
  subsidyRate: string;
  maxSubsidyAmount: string;
  targetBeneficiary: string;
  eligibleMachinery: string[];
  documentsRequired: string[];
  portalLink: string;
}

const SCHEMES_DATA: GovtScheme[] = [
  {
    id: 'smam',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    department: 'Ministry of Agriculture & Farmers Welfare (Govt. of India / Odisha)',
    subsidyRate: '40% – 50%',
    maxSubsidyAmount: 'Up to ₹2,50,000',
    targetBeneficiary: 'Small, Marginal, SC/ST, and Women Farmers',
    eligibleMachinery: ['Tractors (up to 40HP)', 'Power Tillers', 'Laser Land Levelers', 'Self-propelled Paddy Transplanters'],
    documentsRequired: ['Aadhaar Card', 'Land ROR (Patta)', 'Bank Passbook copy', 'Quotation from authorized dealer', 'Passport photo'],
    portalLink: 'https://agrimachinery.nic.in',
  },
  {
    id: 'pmksy',
    name: 'PM Krishi Sinchayee Yojana (Micro Irrigation)',
    department: 'Department of Agriculture & Farmers Empowerment, Odisha',
    subsidyRate: '55% – 70%',
    maxSubsidyAmount: 'Up to ₹1,00,000 / ha',
    targetBeneficiary: 'All Landholding Farmers with valid water source',
    eligibleMachinery: ['Drip Irrigation Systems', 'Micro Sprinklers', 'Solar Submersible Pumps (5 HP)', 'Water Harvesting HDPE pipes'],
    documentsRequired: ['Aadhaar Card', 'Land Record (ROR)', 'Electricity connection bill or NOC', 'LPC (Land Possession Certificate)'],
    portalLink: 'https://pmksy.gov.in',
  },
  {
    id: 'chc',
    name: 'Custom Hiring Centre (CHC) Establishment Scheme',
    department: 'Odisha State Agricultural Directorate (SAFAL Portal)',
    subsidyRate: '40%',
    maxSubsidyAmount: 'Up to ₹10,00,000 for ₹25L project',
    targetBeneficiary: 'Farmer Producer Organizations (FPOs), SHGs & Agri-Entrepreneurs',
    eligibleMachinery: ['Combine Harvesters', 'Multi-crop Threshers', 'High Capacity Straw Balers', 'Fleet of 2+ Tractors with attachments'],
    documentsRequired: ['FPO / SHG Registration Certificate', 'Detailed Project Report (DPR)', 'Bank in-principle loan sanction letter', 'Aadhaar of members'],
    portalLink: 'https://safal.odisha.gov.in',
  },
];

export default function GovernmentEquipment() {
  const [selectedScheme, setSelectedScheme] = useState<GovtScheme>(SCHEMES_DATA[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/40 to-lime-50 text-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-white/80 hover:bg-white px-4 py-2 rounded-xl shadow-xs border border-emerald-200/60 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-100/90 text-emerald-800 rounded-full border border-emerald-300">
            🏛️ Direct Benefit Transfer (DBT) Schemes
          </span>
        </div>

        {/* Hero Header */}
        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/80 shadow-md">
          <div className="flex items-center gap-3 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Landmark className="w-4 h-4 text-emerald-600" />
            Central &amp; State Machinery Subsidies
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Government Equipment Schemes &amp; Subsidies
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
            Verify eligibility, calculate government subsidy incentives, review required paperwork, and apply directly through official state DBT portals.
          </p>
        </div>

        {/* Schemes Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Scheme Cards Column */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Active Subsidy Schemes
            </h2>
            {SCHEMES_DATA.map((s) => {
              const isSelected = s.id === selectedScheme.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedScheme(s)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-700/20 border-emerald-700'
                      : 'bg-white/80 hover:bg-white text-slate-800 border-emerald-100/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-sm line-clamp-1">{s.name}</h3>
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {s.subsidyRate} Subsidy
                    </span>
                  </div>
                  <p className={`text-xs ${isSelected ? 'text-emerald-100' : 'text-slate-500'} line-clamp-1 mb-2`}>
                    {s.department}
                  </p>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className={isSelected ? 'text-emerald-200' : 'text-slate-500'}>Max Assistance:</span>
                    <span className="font-extrabold">{s.maxSubsidyAmount}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scheme Detail View */}
          <div className="lg:col-span-7">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/80 shadow-md space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
                  Scheme Overview
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">{selectedScheme.name}</h2>
                <p className="text-xs text-slate-500 mt-1">{selectedScheme.department}</p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 border border-emerald-200/70 p-3.5 rounded-xl">
                  <span className="text-xs font-bold text-emerald-800 uppercase">Subsidy Rate</span>
                  <div className="text-2xl font-black text-emerald-900 mt-1">{selectedScheme.subsidyRate}</div>
                  <span className="text-xs text-emerald-700">Direct to bank account (DBT)</span>
                </div>
                <div className="bg-teal-50 border border-teal-200/70 p-3.5 rounded-xl">
                  <span className="text-xs font-bold text-teal-800 uppercase">Max Subsidy Cap</span>
                  <div className="text-2xl font-black text-teal-900 mt-1">{selectedScheme.maxSubsidyAmount}</div>
                  <span className="text-xs text-teal-700">{selectedScheme.targetBeneficiary}</span>
                </div>
              </div>

              {/* Eligible Machinery */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Eligible Machinery &amp; Implements
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedScheme.eligibleMachinery.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 text-xs font-medium text-slate-800">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Mandatory Documents
                </h4>
                <div className="space-y-1.5">
                  {selectedScheme.documentsRequired.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portal CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                <a
                  href={selectedScheme.portalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm"
                >
                  <span>Apply on Official DBT Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/financial-support/list"
                  className="text-center bg-white hover:bg-slate-50 text-slate-800 font-bold py-3 px-5 rounded-xl border border-slate-200 transition-all text-sm"
                >
                  View Bank Loan Assistance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
