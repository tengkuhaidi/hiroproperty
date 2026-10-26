/// <reference types="@cloudflare/workers-types" />

// Cloudflare Pages Functions - /api/leads
// GET: list leads & aggregation metrics for marketing dashboard
// POST: capture new lead (from Meta Webhook, Walk-in, or Website)

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const mode = url.searchParams.get('mode');

    // Aggregate statistics mode for Dashboard Charts
    if (mode === 'analytics') {
      const totalLeads = await context.env.DB.prepare('SELECT COUNT(*) as count FROM leads').first();
      const byStatus = await context.env.DB.prepare('SELECT status, COUNT(*) as count FROM leads GROUP BY status').all();
      const bySource = await context.env.DB.prepare('SELECT source, COUNT(*) as count FROM leads GROUP BY source').all();
      const byAge = await context.env.DB.prepare('SELECT guest_age_group, COUNT(*) as count FROM leads WHERE guest_age_group IS NOT NULL GROUP BY guest_age_group').all();
      const byDomicile = await context.env.DB.prepare('SELECT guest_domicile, COUNT(*) as count FROM leads WHERE guest_domicile IS NOT NULL GROUP BY guest_domicile').all();

      return new Response(JSON.stringify({
        total: (totalLeads as any)?.count || 0,
        byStatus: byStatus.results || [],
        bySource: bySource.results || [],
        byAge: byAge.results || [],
        byDomicile: byDomicile.results || [],
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Default: Return leads table list
    const { results } = await context.env.DB.prepare(
      'SELECT * FROM leads ORDER BY created_at DESC LIMIT 100'
    ).all();

    return new Response(JSON.stringify({ leads: results || [] }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as any;
    const { 
      client_name, 
      client_phone, 
      client_email, 
      source, 
      campaign_name, 
      preferred_location, 
      budget_range, 
      sales_rep, 
      guest_age_group, 
      guest_domicile, 
      notes 
    } = body;

    if (!client_name || !client_phone) {
      return new Response(JSON.stringify({ error: 'client_name and client_phone are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const id = 'lead-' + Date.now().toString(36);
    const now = Math.floor(Date.now() / 1000);

    await context.env.DB.prepare(`
      INSERT INTO leads (
        id, client_name, client_phone, client_email, source, campaign_name,
        preferred_location, budget_range, status, sales_rep, guest_age_group,
        guest_domicile, notes, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New', ?, ?, ?, ?, ?)
    `).bind(
      id,
      client_name,
      client_phone,
      client_email || null,
      source || 'Website Form',
      campaign_name || 'Direct / Organic',
      preferred_location || 'Mayfair Enclave',
      budget_range || 'IDR 15 - 20 M',
      sales_rep || 'Unassigned',
      guest_age_group || '36-45',
      guest_domicile || 'Jakarta',
      notes || null,
      now
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
