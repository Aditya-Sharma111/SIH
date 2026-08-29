'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Sprout, BookOpen, Layers, CheckCircle2, AlertTriangle, 
  Droplets, ShieldCheck, ThermometerSun, Calendar, ArrowRight, 
  Sparkles, Leaf, Search, Filter, Printer, Download, Share2, 
  ChevronRight, Bug, HeartPulse, Clock, FileText, Info, Award
} from 'lucide-react';

interface StageGuidance {
  stageId: string;
  stageName: string;
  dayRange: string;
  status: 'COMPLETED' | 'ACTIVE' | 'UPCOMING';
  objective: string;
  soilMoistureTarget: string;
  irrigationSchedule: string;
  fertilizerDose: {
    urea: string;
    dap: string;
    mop: string;
    micronutrients?: string;
  };
  criticalActivities: string[];
  pestAndDiseaseManagement: {
    threat: string;
    symptoms: string;
    remedy: string;
    bioControl: string;
  }[];
  warning: string;
}

interface CropGuideData {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  durationDays: string;
  climateRequirements: {
    optimalTemp: string;
    rainfall: string;
    soilType: string;
    idealPh: string;
  };
  seedRequirementPerAcre: string;
  expectedYieldPerAcre: string;
  mspBenchmark: string;
  stages: StageGuidance[];
}

const CROPS_GUIDE_DATABASE: Record<string, CropGuideData> = {
  paddy: {
    id: 'paddy',
    name: 'Paddy (Rice / Dhan)',
    scientificName: 'Oryza sativa',
    category: 'Cereal / Staple',
    durationDays: '135-145 Days (Swarna Sub-1)',
    climateRequirements: {
      optimalTemp: '25°C - 34°C',
      rainfall: '1000 - 1250 mm',
      soilType: 'Clayey Loam / Silt Loam with good water retention',
      idealPh: '5.5 - 6.8'
    },
    seedRequirementPerAcre: '15 - 20 kg (Transplanted) / 25 kg (DSR)',
    expectedYieldPerAcre: '22 - 26 Quintals',
    mspBenchmark: '₹2,300 / Quintal (Grade A)',
    stages: [
      {
        stageId: 'land_prep',
        stageName: '1. Land & Nursery Preparation',
        dayRange: 'Day -25 to 0',
        status: 'COMPLETED',
        objective: 'Puddle soil thoroughly to reduce percolation loss and prepare raised nursery beds.',
        soilMoistureTarget: 'Saturated (100% field capacity)',
        irrigationSchedule: 'Maintain 2-3 cm standing water during final puddling.',
        fertilizerDose: {
          urea: '10 kg/acre (basal nursery)',
          dap: '15 kg/acre (nursery bed)',
          mop: '8 kg/acre',
          micronutrients: 'Zinc Sulphate (21%) @ 10 kg/acre'
        },
        criticalActivities: [
          'Treat seeds with Carbendazim (2g/kg) or Trichoderma viride (5g/kg) before soaking for 24h.',
          'Incorporate 4-5 tonnes of well-rotted FYM/compost per acre during primary tillage.',
          'Level the field evenly using laser or wooden leveler to ensure uniform water depth.'
        ],
        pestAndDiseaseManagement: [
          {
            threat: 'Nursery Damping Off / Blast',
            symptoms: 'Brown spindle-shaped spots on young nursery shoots.',
            remedy: 'Foliar spray of Tricyclazole 75% WP @ 0.6g/L water.',
            bioControl: 'Seed biopriming with Pseudomonas fluorescens @ 10g/kg.'
          }
        ],
        warning: 'Avoid excessive nitrogen in the nursery bed as it invites early leaf blast.'
      },
      {
        stageId: 'transplanting',
        stageName: '2. Transplanting & Tillering',
        dayRange: 'Day 1 to 35',
        status: 'COMPLETED',
        objective: 'Establish healthy root anchoring and encourage maximum productive tillers per hill.',
        soilMoistureTarget: '2 - 3 cm standing water',
        irrigationSchedule: 'Maintain shallow submergence; avoid deep flooding.',
        fertilizerDose: {
          urea: '25 kg/acre (1st top dressing at 20-25 DAT)',
          dap: '45 kg/acre (Basal at transplanting)',
          mop: '20 kg/acre (Basal)',
          micronutrients: 'Zinc Sulphate @ 10 kg/acre basal'
        },
        criticalActivities: [
          'Transplant 2-3 seedlings per hill at 20cm x 15cm spacing for optimal air circulation.',
          'Maintain water level at 2-3 cm for the first 10 days to facilitate fast root establishment.',
          'Run a cono-weeder at 15 and 30 DAT to aerate soil and eliminate early weeds.'
        ],
        pestAndDiseaseManagement: [
          {
            threat: 'Stem Borer (Yellow Scirpophaga)',
            symptoms: 'Dead hearts in central vegetative shoots.',
            remedy: 'Apply Chlorantraniliprole 0.4% G (Ferterra) @ 4 kg/acre.',
            bioControl: 'Install 5 pheromone traps per acre with Scirpophaga lures.'
          }
        ],
        warning: 'Do not allow standing water to exceed 5 cm, as it suppresses tiller formation.'
      },
      {
        stageId: 'panicle_flowering',
        stageName: '3. Panicle Initiation & Flowering',
        dayRange: 'Day 36 to 85',
        status: 'ACTIVE',
        objective: 'Protect panicle emergence and sustain high photosynthetic grain development.',
        soilMoistureTarget: 'Field capacity to 5 cm submergence (Critical Moisture Window)',
        irrigationSchedule: 'Never let soil dry out during heading; daily moisture check mandatory.',
        fertilizerDose: {
          urea: '20 kg/acre (Final top dress at panicle initiation)',
          dap: 'Nil',
          mop: '15 kg/acre (Boosts grain weight and lodging resistance)',
          micronutrients: 'Foliar spray of 19:19:19 (10g/L) + Boron 20% (1g/L)'
        },
        criticalActivities: [
          'Inspect field borders early morning for Brown Planthopper (BPH) at base of stems.',
          'Apply MOP top-dressing to prevent lodging during late-season winds.',
          'Alternate Wetting and Drying (AWD) can be practiced if water availability is constrained.'
        ],
        pestAndDiseaseManagement: [
          {
            threat: 'Sheath Blight (Rhizoctonia solani)',
            symptoms: 'Oval greenish-grey water-soaked lesions on lower leaf sheaths.',
            remedy: 'Spray Hexaconazole 5% EC @ 2ml/L or Azoxystrobin + Difenoconazole @ 1ml/L.',
            bioControl: 'Apply Pseudomonas fluorescens foliar spray @ 2.5kg/ha.'
          },
          {
            threat: 'Brown Planthopper (BPH)',
            symptoms: 'Circular patches of drying plants known as "hopper burn".',
            remedy: 'Spray Pymetrozine 50% WDG @ 120g/acre directed strictly at the base.',
            bioControl: 'Create alleyways (passing lanes) every 2-3 meters for aeration.'
          }
        ],
        warning: 'Moisture stress during this flowering window causes spikelet sterility and up to 40% yield drop.'
      },
      {
        stageId: 'grain_milking',
        stageName: '4. Milking & Dough Stage',
        dayRange: 'Day 86 to 115',
        status: 'UPCOMING',
        objective: 'Maximize starch translocation into grain kernels and eliminate late pest suction.',
        soilMoistureTarget: 'Moist soil (no deep standing water required)',
        irrigationSchedule: 'Irrigate only to keep topsoil saturated; drain completely 10 days before harvest.',
        fertilizerDose: {
          urea: 'Nil (Excess N causes grain discoloration and lodging)',
          dap: 'Nil',
          mop: 'Nil',
          micronutrients: '0:0:50 (Potassium Sulphate) @ 5g/L foliar spray for grain shine'
        },
        criticalActivities: [
          'Drain all standing water 10-12 days prior to anticipated harvest date.',
          'Bird scaring ribbons during early morning and sunset hours.',
          'Inspect grains for Gandhi Bug foul smell and milky sap discharge.'
        ],
        pestAndDiseaseManagement: [
          {
            threat: 'Rice Gundhi Bug (Leptocorisa acuta)',
            symptoms: 'Black spots on grains with chaffy empty panicles.',
            remedy: 'Dust Malathion 5% DP @ 10 kg/acre during early mornings.',
            bioControl: 'Hang rotten crab/fish traps along field boundaries.'
          }
        ],
        warning: 'Avoid chemical spraying within 14 days of harvest to prevent pesticide residue.'
      },
      {
        stageId: 'harvest_storage',
        stageName: '5. Maturity, Harvest & Storage',
        dayRange: 'Day 116 to 145',
        status: 'UPCOMING',
        objective: 'Harvest at 20-22% moisture, dry to 12-14%, and safeguard grains against storage pests.',
        soilMoistureTarget: 'Dry field for combine harvester mobility',
        irrigationSchedule: 'Completely drained',
        fertilizerDose: { urea: 'Nil', dap: 'Nil', mop: 'Nil' },
        criticalActivities: [
          'Harvest when 85-90% of panicles turn golden straw yellow.',
          'Sun dry harvested paddy for 2-3 days on clean tarpaulins until moisture reaches 12-13%.',
          'Store in hermetic grain bags (PICS bags) or clean metal bins treated with Neem oil.'
        ],
        pestAndDiseaseManagement: [
          {
            threat: 'Rice Weevil & Grain Moth (Storage)',
            symptoms: 'Powdered grains and hollow husks in storage bags.',
            remedy: 'Fumigation with Aluminium Phosphide tablets strictly under supervision.',
            bioControl: 'Mix dried Neem leaves (5kg per quintal) or apply activated clay.'
          }
        ],
        warning: 'Do not bag wet grain (>14% moisture); moisture leads to Aspergillus aflatoxin mold.'
      }
    ]
  },
  groundnut: {
    id: 'groundnut',
    name: 'Groundnut (Peanut / Mungphali)',
    scientificName: 'Arachis hypogaea',
    category: 'Oilseed / Legume',
    durationDays: '105-115 Days (TAG-24 / KADIRI-6)',
    climateRequirements: {
      optimalTemp: '24°C - 32°C',
      rainfall: '500 - 700 mm',
      soilType: 'Well-drained sandy loam / red laterite',
      idealPh: '6.0 - 7.2'
    },
    seedRequirementPerAcre: '40 - 50 kg kernels',
    expectedYieldPerAcre: '10 - 12 Quintals',
    mspBenchmark: '₹6,783 / Quintal',
    stages: [
      {
        stageId: 'sowing',
        stageName: '1. Seed Treatment & Sowing',
        dayRange: 'Day 1 to 15',
        status: 'COMPLETED',
        objective: 'Ensure high germination percentage and Rhizobium nitrogen nodulation.',
        soilMoistureTarget: 'Adequate seedbed moisture',
        irrigationSchedule: 'Pre-sowing irrigation if soil is dry.',
        fertilizerDose: {
          urea: '10 kg/acre',
          dap: '30 kg/acre (Single Super Phosphate preferred @ 100 kg)',
          mop: '15 kg/acre',
          micronutrients: 'Gypsum @ 100 kg/acre at sowing'
        },
        criticalActivities: [
          'Inoculate seeds with Rhizobium culture (250g) + Trichoderma viride (4g/kg).',
          'Sow at depth of 5 cm with spacing of 30cm x 10cm.'
        ],
        pestAndDiseaseManagement: [
          {
            threat: 'Collar Rot / Seedling Blight',
            symptoms: 'Blackening of hypocotyl and sudden seedling wilt.',
            remedy: 'Seed coating with Mancozeb + Carbendazim @ 2g/kg.',
            bioControl: 'Trichoderma harzianum soil enrichment.'
          }
        ],
        warning: 'Avoid deep sowing beyond 6 cm as it weakens emerging plumules.'
      },
      {
        stageId: 'pegging',
        stageName: '2. Flowering, Pegging & Pod Development',
        dayRange: 'Day 16 to 75',
        status: 'ACTIVE',
        objective: 'Facilitate easy peg entry into loose soil and stimulate pod expansion.',
        soilMoistureTarget: 'Optimal moisture; no crust formation',
        irrigationSchedule: 'Irrigate at 40-45 DAS (Critical Pegging Phase).',
        fertilizerDose: {
          urea: 'Nil (Fixes own N)',
          dap: 'Nil',
          mop: '10 kg/acre',
          micronutrients: 'Apply 2nd dose of Gypsum @ 100 kg/acre directly at base during earthing up'
        },
        criticalActivities: [
          'Perform earthing-up at 35 DAS to loosen soil around root zone.',
          'Do not disturb soil after pegging starts (post 45 DAS).'
        ],
        pestAndDiseaseManagement: [
          {
            threat: 'Tikka Disease (Cercospora Leaf Spot)',
            symptoms: 'Dark brown spots with yellow halos on older leaves.',
            remedy: 'Spray Chlorothalonil 75% WP @ 2g/L or Tebuconazole @ 1ml/L.',
            bioControl: 'Neem seed kernel extract (NSKE 5%) spray.'
          }
        ],
        warning: 'Calcium deficiency during pegging causes empty pods ("pops"). Apply Gypsum on time.'
      },
      {
        stageId: 'pod_harvest',
        stageName: '3. Pod Maturity & Harvesting',
        dayRange: 'Day 76 to 115',
        status: 'UPCOMING',
        objective: 'Harvest when inner pod shell shows dark brown coloration.',
        soilMoistureTarget: 'Dry soil for mechanical digging',
        irrigationSchedule: 'Withhold water 10 days before digging.',
        fertilizerDose: { urea: 'Nil', dap: 'Nil', mop: 'Nil' },
        criticalActivities: [
          'Pull out test sample plants and check inner shell for dark vein patterns.',
          'Dry inverted plants in sun for 3-4 days to cure pods.'
        ],
        pestAndDiseaseManagement: [
          {
            threat: 'Pod Borer & White Grub',
            symptoms: 'Holes drilled through pod shells underground.',
            remedy: 'Soil drenching with Chlorpyrifos 20% EC @ 2ml/L.',
            bioControl: 'Beauveria bassiana soil application @ 2.5 kg/ha.'
          }
        ],
        warning: 'Moisture above 8% during storage causes Aspergillus flavus aflatoxin contamination.'
      }
    ]
  },
  ragi: {
    id: 'ragi',
    name: 'Finger Millet (Ragi / Mandia)',
    scientificName: 'Eleusine coracana',
    category: 'Nutri-Cereal / Millet',
    durationDays: '95-105 Days (GPU-28 / Arjun)',
    climateRequirements: {
      optimalTemp: '20°C - 32°C',
      rainfall: '450 - 700 mm',
      soilType: 'Red sandy loam / laterite soils',
      idealPh: '5.0 - 7.5'
    },
    seedRequirementPerAcre: '2 - 3 kg (Nursery) / 4 kg (Direct seed)',
    expectedYieldPerAcre: '12 - 15 Quintals',
    mspBenchmark: '₹4,290 / Quintal (Odisha Millet Mission)',
    stages: [
      {
        stageId: 'establishment',
        stageName: '1. Sowing & Crop Establishment',
        dayRange: 'Day 1 to 25',
        status: 'COMPLETED',
        objective: 'Rapid root system development and optimal plant population.',
        soilMoistureTarget: 'Moderate seedbed moisture',
        irrigationSchedule: '1 light irrigation after transplanting.',
        fertilizerDose: {
          urea: '15 kg/acre (Basal)',
          dap: '25 kg/acre',
          mop: '12 kg/acre',
          micronutrients: 'Azospirillum & PSB biofertilizer seed dip'
        },
        criticalActivities: [
          'Transplant 20-day-old seedlings at 25cm x 10cm spacing.',
          'Incorporate farmyard manure 3 tonnes/acre.'
        ],
        pestAndDiseaseManagement: [
          {
            threat: 'Seedling Blast',
            symptoms: 'Spindle-shaped lesions on young leaves.',
            remedy: 'Spray Tricyclazole 75% WP @ 0.6g/L.',
            bioControl: 'Pseudomonas fluorescens @ 10g/L.'
          }
        ],
        warning: 'Overcrowded direct sown seedlings require thinning within 15 days.'
      },
      {
        stageId: 'tillering_flowering',
        stageName: '2. Tillering & Finger Emergence',
        dayRange: 'Day 26 to 70',
        status: 'ACTIVE',
        objective: 'Foster high productive earhead formation with dense grain fill.',
        soilMoistureTarget: 'Moist root zone',
        irrigationSchedule: 'Irrigate at tillering and earhead emergence.',
        fertilizerDose: {
          urea: '15 kg/acre (Top dress at 30 DAT)',
          dap: 'Nil',
          mop: '10 kg/acre',
          micronutrients: '1% Panchagavya or 19:19:19 foliar spray'
        },
        criticalActivities: [
          'Weeding with cycle-weeder at 20 and 35 DAT.',
          'Earthing up along crop lines.'
        ],
        pestAndDiseaseManagement: [
          {
            threat: 'Finger / Neck Blast',
            symptoms: 'Black lesion at base of earhead causing chaffy fingers.',
            remedy: 'Spray Isoprothiolane 40% EC @ 1.5ml/L at 50% flowering.',
            bioControl: 'Foliar spray with Cow Urine + Asafoetida solution.'
          }
        ],
        warning: 'High humidity combined with cloudy weather triggers neck blast.'
      },
      {
        stageId: 'harvesting',
        stageName: '3. Earhead Ripening & Threshing',
        dayRange: 'Day 71 to 105',
        status: 'UPCOMING',
        objective: 'Harvest when earheads turn chocolate brown.',
        soilMoistureTarget: 'Dry field',
        irrigationSchedule: 'Withhold irrigation',
        fertilizerDose: { urea: 'Nil', dap: 'Nil', mop: 'Nil' },
        criticalActivities: [
          'Harvest individual mature earheads using hand sickles.',
          'Dry earheads on clean threshing floor for 3-5 days.',
          'Thresh using mechanical thresher or stone roller.'
        ],
        pestAndDiseaseManagement: [
          {
            threat: 'Storage Rust / Flour Beetle',
            symptoms: 'Grain dust and larval webbing.',
            remedy: 'Clean store with Malathion 50% EC spray on walls.',
            bioControl: 'Sun drying to <10% grain moisture.'
          }
        ],
        warning: 'Ragi seeds are very small; ensure thresher sieves are properly calibrated.'
      }
    ]
  }
};

export default function FullCropGuide() {
  const [selectedCropKey, setSelectedCropKey] = useState<string>('paddy');
  const [activeStageId, setActiveStageId] = useState<string>('panicle_flowering');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentCrop = CROPS_GUIDE_DATABASE[selectedCropKey] || CROPS_GUIDE_DATABASE.paddy;
  const currentStage = currentCrop.stages.find(s => s.stageId === activeStageId) || currentCrop.stages[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen font-sans text-emerald-950 overflow-x-hidden selection:bg-emerald-500/20">
      
      {/* Background Image Layer (White / Blue / Green Blur Transparent Glass Theme) */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('/images/crop-guide/Bg Laptop.png')`
        }}
      />
      
      {/* Ultra-Modern White Frosted Glass Overlay with subtle Green/Blue tint */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-white/80 via-emerald-50/70 to-teal-50/80 backdrop-blur-[6px] pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-gradient-to-tr from-emerald-400/10 via-transparent to-blue-300/10 pointer-events-none" />

      {/* Decorative Ambient Glass Glowing Orbs */}
      <div className="fixed top-12 left-1/4 w-[34rem] h-[34rem] bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-16 right-12 w-[32rem] h-[32rem] bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        
        {/* Navigation & Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-emerald-300/40">
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard"
              className="group flex items-center justify-center w-10 h-10 rounded-2xl bg-white/60 hover:bg-white/90 text-emerald-950 shadow-sm hover:shadow border border-white/80 backdrop-blur-md transition-all"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-600/15 text-emerald-900 border border-emerald-500/25 backdrop-blur-md">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                  Standard Operating Protocol (SOP)
                </span>
                <span className="text-xs text-emerald-900/70 font-semibold">OUAT & ICAR Verified Agronomy</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-950 mt-1">
                Full Agronomic <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 via-teal-700 to-green-800">Cultivation Guide</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button 
              onClick={handlePrint}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white/60 hover:bg-white text-emerald-950 font-bold text-xs border border-white/80 shadow-sm hover:shadow backdrop-blur-md transition-all"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              Print Guide
            </button>
            <Link 
              href="/crop-monitoring"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-700/90 hover:bg-emerald-800 text-white font-bold text-xs shadow-md hover:shadow-emerald-700/30 border border-emerald-500/40 backdrop-blur-md transition-all"
            >
              <Calendar className="w-4 h-4" />
              Farming Calendar
            </Link>
          </div>
        </header>

        {/* Crop Selector Tabs */}
        <div className="my-5 flex flex-wrap items-center justify-between gap-3 p-2 rounded-3xl bg-white/45 backdrop-blur-xl border border-white/70 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-emerald-900/70 uppercase px-2">Select Crop:</span>
            {Object.keys(CROPS_GUIDE_DATABASE).map((key) => {
              const crop = CROPS_GUIDE_DATABASE[key];
              const isSelected = selectedCropKey === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedCropKey(key);
                    setActiveStageId(crop.stages[0]?.stageId || '');
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all backdrop-blur-md flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-800/30 border border-emerald-600'
                      : 'bg-white/50 hover:bg-white/80 text-emerald-950 hover:text-emerald-800 border border-white/70'
                  }`}
                >
                  <Leaf className="w-3.5 h-3.5" />
                  {crop.name}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-semibold text-emerald-950 px-3.5 py-1.5 bg-emerald-600/15 rounded-2xl border border-emerald-500/20 backdrop-blur-md">
            Duration: <strong className="text-emerald-950 font-black">{currentCrop.durationDays}</strong>
          </div>
        </div>

        {/* Crop Master Baseline Summary Strip */}
        <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/70 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900/70">Ideal Temperature</div>
            <div className="text-sm font-extrabold text-emerald-950 mt-0.5 flex items-center gap-1.5">
              <ThermometerSun className="w-4 h-4 text-amber-600" />
              {currentCrop.climateRequirements.optimalTemp}
            </div>
            <div className="text-xs text-emerald-900/80 font-medium mt-1">
              Rainfall: {currentCrop.climateRequirements.rainfall}
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/70 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900/70">Soil Compatibility</div>
            <div className="text-sm font-extrabold text-emerald-950 mt-0.5 truncate">
              {currentCrop.climateRequirements.soilType}
            </div>
            <div className="text-xs text-emerald-900/80 font-medium mt-1">
              Optimal pH: <strong>{currentCrop.climateRequirements.idealPh}</strong>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/70 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900/70">Seed Rate & Yield</div>
            <div className="text-sm font-extrabold text-emerald-950 mt-0.5">
              {currentCrop.expectedYieldPerAcre} / Acre
            </div>
            <div className="text-xs text-emerald-900/80 font-medium mt-1">
              Seed rate: {currentCrop.seedRequirementPerAcre}
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-emerald-800/85 backdrop-blur-xl text-white border border-emerald-400/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">Government MSP</span>
              <Award className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <div className="text-base font-black text-white">{currentCrop.mspBenchmark}</div>
              <div className="text-xs text-emerald-200/90 mt-0.5">Guaranteed APMC Floor Price</div>
            </div>
          </div>
        </section>

        {/* Main Two-Column Layout: Lifecycle Stage Stepper + In-Depth Stage Manual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Stage Stepper Menu (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/70 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-wider text-emerald-950 mb-3 flex items-center justify-between">
                <span>Crop Lifecycle Stages</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold">
                  {currentCrop.stages.length} Stages
                </span>
              </h2>

              <div className="space-y-2">
                {currentCrop.stages.map((stage, idx) => {
                  const isSelected = stage.stageId === activeStageId;
                  const isCurrentActive = stage.status === 'ACTIVE';

                  return (
                    <button
                      key={stage.stageId}
                      onClick={() => setActiveStageId(stage.stageId)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-700 text-white shadow-md shadow-emerald-800/25 border-emerald-600 ring-2 ring-emerald-500/30'
                          : 'bg-white/40 hover:bg-white/70 text-emerald-950 border-white/60 hover:border-emerald-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-extrabold ${isSelected ? 'text-white' : 'text-emerald-950'}`}>
                            {stage.stageName}
                          </span>
                        </div>
                        <div className={`text-[11px] font-medium ${isSelected ? 'text-emerald-100' : 'text-emerald-900/70'}`}>
                          {stage.dayRange}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isCurrentActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-amber-950 border border-amber-300 animate-pulse">
                            Current
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-700'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="p-4 rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/70 shadow-sm space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-900/80">Agronomic Actions</span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/alternative-crop"
                  className="py-2.5 px-3 rounded-2xl bg-white/50 hover:bg-white text-emerald-950 border border-white/70 font-bold text-xs text-center transition-all shadow-sm"
                >
                  Alternative Crops
                </Link>
                <Link
                  href="/market"
                  className="py-2.5 px-3 rounded-2xl bg-white/50 hover:bg-white text-emerald-950 border border-white/70 font-bold text-xs text-center transition-all shadow-sm"
                >
                  Mandi Compare
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Stage Playbook (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <motion.div
              key={currentStage.stageId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl p-6 bg-white/55 backdrop-blur-3xl border border-white/80 shadow-xl shadow-emerald-950/10 space-y-5"
            >
              {/* Stage Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-950/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-600/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Active Stage Manual
                    </span>
                    <span className="text-xs font-bold text-emerald-800">{currentStage.dayRange}</span>
                  </div>
                  <h3 className="text-2xl font-black text-emerald-950 mt-1">{currentStage.stageName}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                    currentStage.status === 'ACTIVE'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : currentStage.status === 'COMPLETED'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}>
                    {currentStage.status}
                  </span>
                </div>
              </div>

              {/* Stage Strategic Objective */}
              <div className="p-4 rounded-2xl bg-emerald-700/15 border border-emerald-500/30 backdrop-blur-md">
                <div className="text-xs font-black text-emerald-950 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  Stage Agronomic Objective
                </div>
                <p className="text-xs text-emerald-950/90 font-medium leading-relaxed">
                  {currentStage.objective}
                </p>
              </div>

              {/* Water & Irrigation Protocol */}
              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-900/80 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-teal-700" />
                  Water & Moisture Management
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-sm">
                    <div className="text-[10px] font-bold text-emerald-900/70">Target Soil Moisture</div>
                    <div className="text-xs font-black text-emerald-950 mt-0.5">{currentStage.soilMoistureTarget}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-sm">
                    <div className="text-[10px] font-bold text-emerald-900/70">Irrigation Timing & Depth</div>
                    <div className="text-xs font-black text-emerald-950 mt-0.5">{currentStage.irrigationSchedule}</div>
                  </div>
                </div>
              </div>

              {/* Fertilizer & Nutrient Dosages */}
              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-900/80 flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-emerald-700" />
                  NPK & Micronutrient Dose per Acre
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-3 rounded-2xl bg-white/40 border border-white/60">
                    <div className="text-[10px] font-bold text-emerald-900/70">Urea (46% N)</div>
                    <div className="text-xs font-black text-emerald-950 mt-0.5">{currentStage.fertilizerDose.urea}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/40 border border-white/60">
                    <div className="text-[10px] font-bold text-emerald-900/70">DAP (18-46-0)</div>
                    <div className="text-xs font-black text-emerald-950 mt-0.5">{currentStage.fertilizerDose.dap}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/40 border border-white/60">
                    <div className="text-[10px] font-bold text-emerald-900/70">MOP (60% K)</div>
                    <div className="text-xs font-black text-emerald-950 mt-0.5">{currentStage.fertilizerDose.mop}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/40 border border-white/60 col-span-2 sm:col-span-1">
                    <div className="text-[10px] font-bold text-emerald-900/70">Micronutrients</div>
                    <div className="text-xs font-black text-emerald-950 mt-0.5 truncate">{currentStage.fertilizerDose.micronutrients || 'Standard'}</div>
                  </div>
                </div>
              </div>

              {/* Critical Activities Checklist */}
              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-900/80 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Mandatory Stage Field Operations
                </div>
                <div className="space-y-1.5">
                  {currentStage.criticalActivities.map((act, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-emerald-950 font-medium p-2.5 rounded-2xl bg-white/35 border border-white/50">
                      <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-emerald-700 text-white text-[10px] font-black shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="mt-0.5">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integrated Pest & Disease Management (IPM) */}
              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-900/80 flex items-center gap-1.5">
                  <Bug className="w-4 h-4 text-amber-700" />
                  Pest & Disease Scouting & Remediation
                </div>
                <div className="space-y-2.5">
                  {currentStage.pestAndDiseaseManagement.map((ipm, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/40 border border-white/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-red-950 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                          {ipm.threat}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                          ICAR Verified
                        </span>
                      </div>
                      <div className="text-xs text-emerald-950/80">
                        <strong>Symptoms:</strong> {ipm.symptoms}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-[11px] text-emerald-950">
                          <strong className="text-emerald-900 block mb-0.5">🌿 Bio-Control Method:</strong>
                          {ipm.bioControl}
                        </div>
                        <div className="p-2.5 rounded-xl bg-sky-50/80 border border-sky-200/60 text-[11px] text-slate-900">
                          <strong className="text-sky-900 block mb-0.5">🧪 Chemical Intervention:</strong>
                          {ipm.remedy}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Warning Alert */}
              <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 backdrop-blur-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-amber-950 block font-black mb-0.5">Stage Vulnerability Warning:</strong>
                  <span className="text-amber-900 font-medium leading-relaxed">{currentStage.warning}</span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>

    </div>
  );
}
