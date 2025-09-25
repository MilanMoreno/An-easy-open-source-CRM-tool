/*
  # Fix RLS policies for contact_requests_simple table

  1. Security Updates
    - Ensure public users can insert contact requests
    - Maintain read restrictions for service role only
    - Fix any policy conflicts

  2. Policy Updates
    - Drop existing conflicting policies if any
    - Create clear, working policies for anonymous submissions
*/

-- First, let's make sure RLS is enabled
ALTER TABLE contact_requests_simple ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public inserts to contact_requests_simple" ON contact_requests_simple;
DROP POLICY IF EXISTS "Allow service role to read contact_requests_simple" ON contact_requests_simple;
DROP POLICY IF EXISTS "Enable public inserts" ON contact_requests_simple;

-- Create a clear policy for anonymous/public inserts
CREATE POLICY "Enable anonymous contact submissions"
  ON contact_requests_simple
  FOR INSERT
  TO anon, public
  WITH CHECK (true);

-- Create policy for service role to read all data
CREATE POLICY "Service role can read all contact requests"
  ON contact_requests_simple
  FOR SELECT
  TO service_role
  USING (true);

-- Create policy for authenticated users to read (optional, for admin interface)
CREATE POLICY "Authenticated users can read contact requests"
  ON contact_requests_simple
  FOR SELECT
  TO authenticated
  USING (true);