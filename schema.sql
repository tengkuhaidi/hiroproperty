-- HIRO PROPERTY ENTERPRISE SCHEMA (CLOUDFLARE D1)
-- Zero-Mistake Edge Database for 4 Integrated Products

-- 1. ARTICLES / PROMO (Public Website & CMS)
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT DEFAULT 'Hiro Editorial Desk',
  status TEXT CHECK(status IN ('draft', 'published')) DEFAULT 'published',
  views INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- 2. LEADS & VISIT DEMOGRAPHICS (Marketing Dashboard)
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_email TEXT,
  source TEXT NOT NULL, -- 'Meta Ads', 'Walk-in', 'Website Form', 'WhatsApp', 'Agent'
  campaign_name TEXT,
  preferred_location TEXT, -- 'Pondok Indah', 'Menteng', 'Canggu', 'Uluwatu', etc.
  budget_range TEXT,
  status TEXT CHECK(status IN ('New', 'Contacted', 'Scheduled Visit', 'Negotiation', 'Closed Won', 'Lost')) DEFAULT 'New',
  sales_rep TEXT NOT NULL,
  guest_age_group TEXT, -- '25-35', '36-45', '46-60', '>60'
  guest_domicile TEXT, -- 'Jakarta Selatan', 'Surabaya', 'Expat', etc.
  notes TEXT,
  created_at INTEGER NOT NULL
);

-- 3. MASTERSTOCK & REAL-TIME UNIT INVENTORY
CREATE TABLE IF NOT EXISTS units (
  id TEXT PRIMARY KEY,
  cluster TEXT NOT NULL, -- e.g. 'Mayfair Enclave', 'Pondok Indah Pavilion', 'Canggu Sanctuary'
  unit_number TEXT UNIQUE NOT NULL, -- e.g. 'A-01', 'B-12'
  type_name TEXT NOT NULL, -- e.g. 'Signature Villa 4BR', 'Grand Estate 5BR'
  land_area_sqm INTEGER NOT NULL,
  building_area_sqm INTEGER NOT NULL,
  price_idr INTEGER NOT NULL,
  status TEXT CHECK(status IN ('AVAILABLE', 'HOLD', 'BOOKED', 'SOLD')) DEFAULT 'AVAILABLE',
  held_by_sales TEXT,
  hold_expires_at INTEGER, -- Timestamp in unix epoch seconds
  buyer_name TEXT,
  updated_at INTEGER NOT NULL
);

-- 4. CASHFLOW & MARCOMM WALLET (Expenses & LPJ)
CREATE TABLE IF NOT EXISTS marcomm_expenses (
  id TEXT PRIMARY KEY,
  expense_date TEXT NOT NULL, -- 'YYYY-MM-DD'
  category TEXT NOT NULL, -- 'Meta Ads', 'Billboard/OOH', 'Event & Gathering', 'Influencer/KOL', 'Print & Merchandise', 'Misc'
  title TEXT NOT NULL,
  amount_idr INTEGER NOT NULL,
  receipt_url TEXT, -- Link in Cloudflare R2 bucket
  paid_by TEXT NOT NULL,
  payment_method TEXT NOT NULL, -- 'Corporate BCA', 'Credit Card', 'Petty Cash'
  lpj_status TEXT CHECK(lpj_status IN ('Draft', 'Submitted', 'Approved', 'Reimbursed')) DEFAULT 'Draft',
  notes TEXT,
  created_at INTEGER NOT NULL
);

-- Indexes for lightning fast Edge queries
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_units_status ON units(status);
CREATE INDEX IF NOT EXISTS idx_units_cluster ON units(cluster);
CREATE INDEX IF NOT EXISTS idx_marcomm_date ON marcomm_expenses(expense_date);
