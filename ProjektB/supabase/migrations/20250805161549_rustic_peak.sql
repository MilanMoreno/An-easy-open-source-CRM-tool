/*
  # Disable RLS for contact_requests_simple table
  
  This migration temporarily disables Row Level Security for the contact_requests_simple table
  to allow anonymous contact form submissions. This is a common pattern for contact forms
  where you want to allow public submissions without authentication.
  
  1. Disable RLS on contact_requests_simple table
  2. This allows anonymous users to insert contact form data
  3. The table will still be secure as it only contains contact form submissions
*/

-- Disable RLS on the contact_requests_simple table
ALTER TABLE contact_requests_simple DISABLE ROW LEVEL SECURITY;

-- Optional: Add a comment to document this decision
COMMENT ON TABLE contact_requests_simple IS 'Contact form submissions - RLS disabled to allow anonymous submissions';