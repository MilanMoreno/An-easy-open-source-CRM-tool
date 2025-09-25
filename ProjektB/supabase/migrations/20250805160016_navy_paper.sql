/*
  # Enable Anonymous Contact Form Submissions

  1. Security Changes
    - Drop existing restrictive policies on contact_requests_simple
    - Create new policy allowing anonymous users to insert contact requests
    - Maintain read restrictions for authenticated users only

  2. Changes Made
    - Allow INSERT for anon and public roles
    - Keep SELECT restricted to authenticated and service_role users
*/

-- Drop existing policies that might be blocking inserts
DROP POLICY IF EXISTS "Authenticated users can read contact requests" ON contact_requests_simple;
DROP POLICY IF EXISTS "Enable anonymous contact submissions" ON contact_requests_simple;
DROP POLICY IF EXISTS "Service role can read all contact requests" ON contact_requests_simple;

-- Create a simple policy that allows anonymous users to submit contact forms
CREATE POLICY "Allow anonymous contact form submissions" 
ON contact_requests_simple 
FOR INSERT 
TO anon, public
WITH CHECK (true);

-- Allow authenticated users and service role to read contact requests
CREATE POLICY "Allow authenticated users to read contact requests"
ON contact_requests_simple
FOR SELECT
TO authenticated, service_role
USING (true);

-- Ensure RLS is enabled
ALTER TABLE contact_requests_simple ENABLE ROW LEVEL SECURITY;