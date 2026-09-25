-- Ghost Factory™ Production Schema for FREIGHT BROKER DISPATCH OS
-- PostgreSQL 15+ Compatible with Row Level Security (RLS)

-- 1. Main Fleet / Asset Inventory Table
CREATE TABLE IF NOT EXISTS load_board (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_tag VARCHAR(50) UNIQUE NOT NULL,
    model_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    daily_rate_cents INTEGER NOT NULL,
    operational_status VARCHAR(50) DEFAULT 'AVAILABLE',
    telematics_runtime_hours NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Dispatch / Booking Records Table
CREATE TABLE IF NOT EXISTS carrier_directory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID REFERENCES load_board(id) ON DELETE SET NULL,
    client_name VARCHAR(150) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    dispatch_date DATE NOT NULL,
    return_date DATE,
    contract_status VARCHAR(50) DEFAULT 'ACTIVE',
    security_deposit_cents INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Telemetry / Quality Inspections Table
CREATE TABLE IF NOT EXISTS rate_confirmations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID REFERENCES load_board(id) ON DELETE CASCADE,
    inspector_id VARCHAR(100) NOT NULL,
    inspection_notes TEXT,
    compliance_passed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Audit & Delivery Dispatches Table
CREATE TABLE IF NOT EXISTS bol_vault (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispatch_code VARCHAR(100) UNIQUE NOT NULL,
    destination_site TEXT NOT NULL,
    carrier_license VARCHAR(100),
    bill_of_lading_hash VARCHAR(255),
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE load_board ENABLE ROW LEVEL SECURITY;
ALTER TABLE carrier_directory ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_confirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bol_vault ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Public Read Access" ON load_board FOR SELECT USING (true);
CREATE POLICY "Public Insert Access" ON carrier_directory FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Access Fleet" ON load_board FOR ALL USING (true);
CREATE POLICY "Admin All Access Contracts" ON carrier_directory FOR ALL USING (true);
CREATE POLICY "Admin All Access Inspections" ON rate_confirmations FOR ALL USING (true);
CREATE POLICY "Admin All Access Dispatches" ON bol_vault FOR ALL USING (true);
