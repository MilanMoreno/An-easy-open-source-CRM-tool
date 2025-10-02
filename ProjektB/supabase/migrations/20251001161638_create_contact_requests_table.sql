/*
  # Create Contact Requests Table

  1. New Tables
    - `contact_requests_simple`
      - `id` (uuid, primary key) - Auto-generated unique identifier
      - `name` (text, required) - Contact form submitter's name
      - `email` (text, required) - Contact form submitter's email
      - `message` (text, required) - Contact form message content
      - `created_at` (timestamptz) - Timestamp of form submission

  2. Security
    - RLS is disabled to allow anonymous contact form submissions
    - This is standard practice for public contact forms
    - Contact form data is not sensitive and needs to be publicly accessible

  3. Notes
    - No authentication required for submissions
    - Table can be managed through Supabase dashboard
*/

-- Create the contact requests table
CREATE TABLE IF NOT EXISTS contact_requests_simple (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Disable RLS to allow anonymous submissions
ALTER TABLE contact_requests_simple DISABLE ROW LEVEL SECURITY;

-- Add helpful comment
COMMENT ON TABLE contact_requests_simple IS 'Contact form submissions - RLS disabled to allow anonymous submissions';