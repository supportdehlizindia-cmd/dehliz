-- DEHLIZ Database Schema Migration
-- Run this SQL in your Supabase Dashboard SQL Editor (https://supabase.com)
-- This setup ensures thread-safe, concurrent, and unique Volunteer ID generation on the database side.

-- 1. Create a sequence for the volunteer counter if it does not already exist
CREATE SEQUENCE IF NOT EXISTS volunteer_id_seq START 1;

-- 2. Ensure volunteer_applications table exists and is fully structured
CREATE TABLE IF NOT EXISTS volunteer_applications (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    area_of_interest TEXT,
    message TEXT,
    volunteer_id TEXT UNIQUE DEFAULT ('DEHLIZ-VOL-' || lpad(nextval('volunteer_id_seq')::text, 4, '0'))
);

-- 3. Idempotently add the volunteer_id column if the table already exists but lacks it
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'volunteer_applications' AND column_name = 'volunteer_id'
    ) THEN
        ALTER TABLE volunteer_applications 
        ADD COLUMN volunteer_id TEXT UNIQUE DEFAULT ('DEHLIZ-VOL-' || lpad(nextval('volunteer_id_seq')::text, 4, '0'));
    END IF;
END $$;

-- 4. Set RLS (Row Level Security) helper rules (Adjust to fit your workspace authorization needs)
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to volunteer_applications" 
ON volunteer_applications 
FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Allow public read to volunteer_applications" 
ON volunteer_applications 
FOR SELECT 
TO public 
USING (true);
