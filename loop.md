# 🌾 Smart Crop — Comprehensive Feature Documentation & Architecture Overview

> **Smart Crop (Hecta Smart Farm OS)** is an end-to-end intelligent agricultural decision support system connecting farmers, agriculture officers, and financial/insurance institutions with live telemetry, satellite surveillance, mandi market pricing, government subsidies, and an AWS RDS MySQL database backend.

---

## 📑 Table of Contents
1. [System Architecture & Backend Infrastructure](#1-system-architecture--backend-infrastructure)
2. [Authentication & Multi-Role Onboarding](#2-authentication--multi-role-onboarding)
3. [Farmer Profile & Farm Management](#3-farmer-profile--farm-management)
4. [Crop Monitoring & Precision Farm Intelligence](#4-crop-monitoring--precision-farm-intelligence)
5. [Market Decision & Mandi Net Realization (PRD Module)](#5-market-decision--mandi-net-realization-prd-module)
6. [Government Equipment & Agricultural Schemes Hub](#6-government-equipment--agricultural-schemes-hub)
7. [Crop Insurance & Bank Loan Portal (PMFBY / KCC)](#7-crop-insurance--bank-loan-portal-pmfby--kcc)
8. [Agriculture Officer & Admin Surveillance Dashboard](#8-agriculture-officer--admin-surveillance-dashboard)
9. [Smart Notification & Early Warning System](#9-smart-notification--early-warning-system)
10. [REST API Endpoints & Database Schema Reference](#10-rest-api-endpoints--database-schema-reference)
11. [Available Routes & Navigation Map](#11-available-routes--navigation-map)

---

## 1. System Architecture & Backend Infrastructure

- **Framework**: Next.js 16 (Turbopack, App Router) with React 19 & TypeScript.
- **Styling**: Tailwind CSS & Glassmorphism design system.
- **Database**: AWS RDS MySQL (`sih-mysql.cley86o8g8vx.eu-north-1.rds.amazonaws.com`).
- **Connection Pool**: `mysql2/promise` with automatic keep-alive (`enableKeepAlive: true`, `keepAliveInitialDelay: 10000`), connection reuse, and graceful fallback store.
- **Automated CLI Scripts**:
  - `npm run test:db` (`scripts/test-rds.mjs`): Pings database, tests table schemas, and executes an INSERT ➔ SELECT ➔ DELETE round-trip test.
  - `npm run seed:db` (`scripts/insert-data.mjs`): Seeds verified sample farmers, crops, and banking data with console tables.

---

## 2. Authentication & Multi-Role Onboarding

- **Clerk Integration**: Pre-configured secure sign-in (`/sign-in`) and sign-up (`/sign-up`) interfaces.
- **Role Selection Onboarding (`/onboarding`)**:
  - **🌾 Farmer**: Stores farmer details, land acreage, crop stage, and financial loans in AWS RDS.
  - **🛡️ Agriculture Officer / Administrator**: Captures officer credentials, designation, jurisdiction district, and department.
  - **🏦 Bank & Insurance Officer**: Manages bank/branch codes, designation, and loan/PMFBY insurance claims.
- **Smart Redirection**: Redirects each role automatically to their respective specialized dashboard upon sign-in.

---

## 3. Farmer Profile & Farm Management

**Route**: `/farmer-profile` (or `/farmerprofile`)
- **Live Database Sync**: Fetches and modifies farmer records in real-time from `/api/farmers`.
- **Farmer Identity & Privacy**: Displays masked contact details, land area, and profile completeness tracker.
- **Multilingual Support**: Real-time interface translation across:
  - Odia (`or` - ଓଡ଼ିଆ)
  - Hindi (`hi` - हिन्दी)
  - English (`en`)
  - Santali (`sat`)
- **Multi-Plot Management**: Add and monitor multiple farm plots with varying crops, sowing dates, and acreages.
- **Financial Status Overview**: Tracks active Kisan Credit Card (KCC) loan amounts and upcoming due dates.
- **Notification Preference Controls**: Granular toggles for weather alerts, disease risks, market spikes, and officer advisories.

---

## 4. Crop Monitoring & Precision Farm Intelligence

**Routes**: `/crop-monitoring` · `/crop-monitoring-page`
- **NDVI & Satellite Telemetry**: Real-time vegetation indices, chlorophyll activity, and crop stress levels.
- **Agromonitoring Soil Telemetry**:
  - Live soil moisture (%) at surface and root depth.
  - Soil temperature (°C) and NPK (Nitrogen, Phosphorus, Potassium) indicators.
- **Weather Forecast Engine**: OpenWeatherMap integration providing 7-day precipitation forecasts, wind speeds, and frost/heatwave warnings.
- **Growth Stage Timeline**: Visual tracking from Sowing & Germination ➔ Tillering ➔ Flowering ➔ Grain Filling ➔ Harvesting.
- **Pest & Disease Advisory**: Early warning detection with AI-driven preventive organic/chemical recommendations.

---

## 5. Market Decision & Mandi Net Realization (PRD Module)

**Routes**: `/market` · `/marketpage`
- **Core Formula**: **`Net Realization = Mandi Modal Price - Freight/Transport Cost`**
- **Agmarknet Live Mandi Network**: Integration with Data.gov.in live prices for regional APMC yards.
- **Automated Transport Cost Calculator**: `Base Fee (₹50) + Distance (₹0.55/km/quintal)`.
- **MSP (Minimum Support Price) Benchmark Comparison**: Instantly highlights if a mandi offers prices above or below statutory MSP.
- **Best Market Recommendation Badge**: Recommends the highest net profit mandi after taking distance into account.
- **Price Trend Charts**: Dynamic price point curves across 7-Day, 30-Day, 3-Month, and 6-Month historical intervals.
- **Side-by-Side Mandi Comparison**: Detailed comparison modal comparing distance, gross price, net realization, and total profit across harvest volume.

---

## 6. Government Equipment & Agricultural Schemes Hub

**Routes**: `/government-equipment-schemes` · `/schemes` · `/equipment-schemes` · `/government-schemes`
- **Personalized Eligibility Matcher**: Evaluates farmer landholding size, crop type, and district against active government subsidies.
- **Key Supported Schemes**:
  - **SMAM (Sub-Mission on Agricultural Mechanization)**: Up to 50% subsidy on Power Tillers, Tractors & Transplanters.
  - **PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)**: ₹6,000/year direct cash benefit.
  - **KALIA (Krushak Assistance for Livelihood and Income Augmentation)**: ₹10,000/year seasonal input assistance.
  - **PMKSY (Per Drop More Crop)**: 55% subsidy on Drip & Micro-Sprinkler Irrigation.
  - **Biju Krushak Kalyan Yojana (BKKY)**: Health and accidental insurance protection.
- **Interactive Scheme Details**:
  - Step-by-step application walkthrough.
  - Required document checklist (Aadhaar, Land RoR/Patta, Bank Passbook).
  - Simple Text Mode for easy reading in rural areas.

---

## 7. Crop Insurance & Bank Loan Portal (PMFBY / KCC)

**Route**: `/insurance`
- **PMFBY Subsidized Premium Calculator**: 2% Kharif food grain premium calculation vs. 98% government subsidy.
- **Satellite Claim Assessment**: Automated crop damage estimation based on weather anomaly records and flood/drought indices.
- **Direct Claim Submission**: Upload photos and claim documentation directly to insurance assessors.
- **Bank Loan Status**: Real-time tracking of KCC and agri-loan approval pipelines.

---

## 8. Agriculture Officer & Admin Surveillance Dashboard

**Routes**: `/agriculture-officer-dashboard` · `/officer-dashboard`
- **Cluster & District Overview**: Macro-level overview of total farmers registered, crop acreages, and high-risk clusters.
- **Stress Map Surveillance**: Visual heatmaps pinpointing moisture deficits, pest outbreaks, and flood vulnerabilities.
- **Direct Advisory Broadcast**: Issue targeted SMS and app notifications to all farmers within a specific Gram Panchayat or Block.
- **Farmer Grievance Desk**: Review and resolve farmer queries and insurance verification requests.

---

## 9. Smart Notification & Early Warning System

**Routes**: `/notifications` · `/notification-page`
- **Category Badges**: Critical Weather, Pest & Disease Alert, Market Price Surge, Scheme Deadline.
- **Sound Alerts**: Configurable audio chimes for critical agricultural alerts.
- **Actionable Notifications**: Direct links from notifications to relevant guidance or mandi listings.

---

## 10. REST API Endpoints & Database Schema Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/farmers` | List farmers with pagination, search by name/phone/district, or query single by `?id=` |
| `POST` | `/api/farmers` | Insert new farmer record matching exact schema |
| `PUT` | `/api/farmers` | Update farmer attributes |
| `DELETE` | `/api/farmers` | Delete farmer record |
| `GET` | `/api/crops` | Retrieve all crops or filter by `?farmer_id=` |
| `POST` | `/api/crops` | Add new crop linked to farmer |
| `PUT` | `/api/crops` | Update crop stage or sowing date |
| `DELETE` | `/api/crops` | Remove crop |
| `GET` | `/api/market` | Compute nearby mandis, freight deductions, and best net realization |
| `GET` / `POST` | `/api/profile` | Manage role profile (Farmer, Officer, Bank) and sync with database |

### Exact Database Schema Definitions:
```sql
-- Farmers Table
CREATE TABLE farmers (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  district VARCHAR(100),
  village VARCHAR(100),
  language VARCHAR(50) DEFAULT 'en',
  land_area DECIMAL(10,2) DEFAULT 0.00,
  loan_amount DECIMAL(12,2) DEFAULT 0.00,
  loan_due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crops Table
CREATE TABLE crops (
  id VARCHAR(64) PRIMARY KEY,
  farmer_id VARCHAR(64) NOT NULL,
  name VARCHAR(100) NOT NULL,
  stage VARCHAR(100) DEFAULT 'Sowing',
  sowing_date DATE,
  FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
);

-- User Role Mapping Table
CREATE TABLE users (
  id VARCHAR(100) PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'farmer',
  profile_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 11. Available Routes & Navigation Map

| Page / Feature | Primary URL | Alternative Aliases |
| :--- | :--- | :--- |
| **Role Onboarding Form** | `/onboarding` | `/dashboard` (redirects) |
| **Mandi & Market Intelligence** | `/market` | `/marketpage` |
| **Government Equipment Schemes** | `/government-equipment-schemes` | `/schemes`, `/equipment-schemes`, `/government-schemes` |
| **Farmer Profile & Farms** | `/farmer-profile` | `/farmerprofile` |
| **Crop Telemetry & Monitoring** | `/crop-monitoring` | `/crop-monitoring-page` |
| **Crop Insurance & PMFBY** | `/insurance` | — |
| **Agriculture Officer Dashboard** | `/agriculture-officer-dashboard` | `/officer-dashboard` |
| **Notification Center** | `/notifications` | `/notification-page` |
| **Sign In / Sign Up** | `/sign-in`, `/sign-up` | — |
