/*
  # Fix contact requests RLS policies

  1. Security Updates
    - Drop existing restrictive policies
    - Create new policy allowing anonymous users to insert contact requests
    - Keep read access restricted to authenticated users only

  2. Changes
    - Allow public (anonymous) users to submit contact forms
    - Maintain security for reading contact requests
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can submit contact requests" ON contact_requests;
DROP POLICY IF EXISTS "Authenticated users can read contact requests" ON contact_requests;
DROP POLICY IF EXISTS "Authenticated users can update contact requests" ON contact_requests;

-- Create new policy for inserting (allow anonymous users)
CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated users to insert
CREATE POLICY "Allow authenticated contact form submissions"
  ON contact_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for reading contact requests (only authenticated users)
CREATE POLICY "Authenticated users can read contact requests"
  ON contact_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for updating contact requests (only authenticated users)
CREATE POLICY "Authenticated users can update contact requests"
  ON contact_requests
  FOR UPDATE
  TO authenticated
  USING (true);