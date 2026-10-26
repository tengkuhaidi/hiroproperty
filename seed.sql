-- INITIAL SEED DATA FOR HIRO PROPERTY ENTERPRISE
-- Real data for Articles, Masterstock Units, Leads, and Marcomm Wallet

-- 1. Initial Articles
INSERT INTO articles (id, slug, title, category, excerpt, content, cover_image, author, status, views, created_at, updated_at) VALUES
('art-01', 'tren-investasi-villa-luxury-bali-2027', 'Tren Investasi Villa Luxury di Canggu & Uluwatu: Return on Capital Pasca Regulasi Zonasi Baru', 'Market Insight', 'Analisis komprehensif yield sewa villa private estate dan proteksi kepemilikan aset HGB murni bagi investor HNW.', 'Pasar properti ultra-luxury di Bali mengalami transformasi signifikan. Investor tidak lagi hanya mencari return sewa jangka pendek, melainkan kepastian legalitas sertifikat HGB murni dan zonasi pariwisata terverifikasi RDTR.\n\nDengan tingkat okupansi rata-rata mencapai 82% di kawasan Canggu dan Uluwatu ridge, unit villa 3-4 bedroom dengan konsep sustainable brutalism mencatatkan apresiasi modal hingga 18% YoY.', '/images/villa.jpg', 'Hiro Private Advisory Desk', 'published', 420, 1792670000, 1792670000),
('art-02', 'panduan-akuisisi-private-estate-pondok-indah', 'Panduan Akuisisi Private Estate di Kawasan Bukit Golf Pondok Indah: Standar Due Diligence Dokumen', 'Legal & Advisory', 'Pemeriksaan ketat riwayat sertifikat tanah, kesesuaian GSB/KLB tata kota DKI, dan transaksi melalui rekening escrow terpercaya.', 'Kawasan Bukit Golf Pondok Indah tetap menjadi tolak ukur prestise residensial di Jakarta Selatan. Dalam proses akuisisi aset bernilai di atas Rp 25 Miliar, kepatuhan verifikasi di BPN dan notaris rekanan menjadi benteng utama.\n\nHiro Property menerapkan standar 7-layer verification sebelum sebuah listing ditawarkan secara eksklusif kepada klien privat.', '/images/modern.jpg', 'Tengku H. (Managing Partner)', 'published', 285, 1792756400, 1792756400);

-- 2. Masterstock Units (Pondok Indah Pavilion & Canggu Ridge)
INSERT INTO units (id, cluster, unit_number, type_name, land_area_sqm, building_area_sqm, price_idr, status, held_by_sales, hold_expires_at, buyer_name, updated_at) VALUES
('u-01', 'Mayfair Enclave', 'A-01', 'Signature Villa 4BR', 420, 550, 18500000000, 'AVAILABLE', NULL, NULL, NULL, 1792756400),
('u-02', 'Mayfair Enclave', 'A-02', 'Signature Villa 4BR', 420, 550, 18500000000, 'HOLD', 'Sales Budi', 1793500000, 'Pak Hendra (Waiting KPR)', 1792756400),
('u-03', 'Mayfair Enclave', 'A-03', 'Grand Estate 5BR Corner', 580, 720, 26000000000, 'SOLD', 'Sales Citra', NULL, 'Ibu Veronica S.', 1792756400),
('u-04', 'Mayfair Enclave', 'B-01', 'Executive Residence 3BR', 320, 410, 14200000000, 'AVAILABLE', NULL, NULL, NULL, 1792756400),
('u-05', 'Mayfair Enclave', 'B-02', 'Executive Residence 3BR', 320, 410, 14200000000, 'BOOKED', 'Sales Budi', NULL, 'dr. Robert Kurniawan', 1792756400),
('u-06', 'Canggu Sanctuary', 'CS-01', 'Tropical Horizon Villa', 350, 480, 12500000000, 'AVAILABLE', NULL, NULL, NULL, 1792756400),
('u-07', 'Canggu Sanctuary', 'CS-02', 'Tropical Horizon Villa', 350, 480, 12500000000, 'HOLD', 'Sales Dina', 1793600000, 'Mr. Julian (Expat Investor)', 1792756400),
('u-08', 'Canggu Sanctuary', 'CS-03', 'Cliffside Manor 6BR', 750, 950, 34000000000, 'AVAILABLE', NULL, NULL, NULL, 1792756400);

-- 3. Initial Leads (Marketing Dashboard)
INSERT INTO leads (id, client_name, client_phone, client_email, source, campaign_name, preferred_location, budget_range, status, sales_rep, guest_age_group, guest_domicile, notes, created_at) VALUES
('lead-01', 'Bpk. Irwan Santoso', '081288992211', 'irwan.santoso@holdings.co.id', 'Meta Ads', 'IG_Luxury_PondokIndah_Q4', 'Pondok Indah', 'IDR > 25 M', 'Scheduled Visit', 'Sales Citra', '46-60', 'Jakarta Selatan', 'Tertarik unit hook Mayfair Enclave A-03. Jadwal visit Sabtu 10:00.', 1792680000),
('lead-02', 'Ibu Diana Wijaya', '08119933442', 'diana.w@gmail.com', 'Website Form', 'Organic Google Search', 'Canggu', 'IDR 10 - 15 M', 'Negotiation', 'Sales Dina', '36-45', 'Surabaya', 'Mencari villa rental yield tinggi di Bali. Siap cash bertahap.', 1792720000),
('lead-03', 'dr. Eko Prasetyo, Sp.A', '081377884455', 'dr.eko@klinikindah.com', 'Walk-in', 'Open House Expo', 'Pondok Indah', 'IDR 15 - 20 M', 'Contacted', 'Sales Budi', '36-45', 'Jakarta Barat', 'Follow up draft unit plan dan simulasi pembiayaan bank rekanan.', 1792760000);

-- 4. Initial Marcomm Expenses (Cashflow Wallet)
INSERT INTO marcomm_expenses (id, expense_date, category, title, amount_idr, receipt_url, paid_by, payment_method, lpj_status, notes, created_at) VALUES
('exp-01', '2026-10-18', 'Meta Ads', 'Top Up Saldo Meta Ads Manager (Kampanye Hiro Private Estates)', 5000000, 'https://hiroproperty.pages.dev/receipts/meta-oct18.pdf', 'Jendro', 'Corporate BCA', 'Approved', 'Faktur pajak tercatat resmi', 1792400000),
('exp-02', '2026-10-22', 'Event & Gathering', 'Catering VIP Gathering Private Tasting di Show Unit Mayfair', 3850000, 'https://hiroproperty.pages.dev/receipts/catering-oct22.jpg', 'Jendro', 'Credit Card', 'Submitted', 'Undangan 12 tamu HNW', 1792740000),
('exp-03', '2026-10-24', 'Print & Merchandise', 'Cetak Hardcover Exclusive Booklet Unit Plan & Leather Folder', 2400000, 'https://hiroproperty.pages.dev/receipts/print-oct24.pdf', 'Jendro', 'Corporate BCA', 'Draft', 'Batch kedua 50 eksemplar', 1792920000);
