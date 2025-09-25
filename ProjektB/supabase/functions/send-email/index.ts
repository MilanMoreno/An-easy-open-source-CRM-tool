import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, name, email, message } = await req.json()

    // Log the contact form submission
    console.log(`
      New Contact Form Submission:
      To: ${to}
      Subject: ${subject}
      From: ${name} (${email})
      Message: ${message}
    `)

    // Here you would integrate with your preferred email service
    // For now, we'll just log the details and return success
    
    // Example integrations you could add:
    // - SendGrid
    // - Resend
    // - Nodemailer with SMTP
    // - AWS SES

    return new Response(
      JSON.stringify({ 
        message: 'Contact form submitted successfully',
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})