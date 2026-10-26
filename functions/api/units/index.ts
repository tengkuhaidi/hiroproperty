/// <reference types="@cloudflare/workers-types" />

// Cloudflare Pages Functions - /api/units
// Real-time Masterstock Inventory Management
// GET: list units with filters
// POST: change unit status (HOLD, BOOKED, SOLD, AVAILABLE) with atomic lock

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const cluster = url.searchParams.get('cluster');
    const status = url.searchParams.get('status');

    let query = 'SELECT * FROM units';
    const params: any[] = [];
    const conditions: string[] = [];

    if (cluster) {
      conditions.push('cluster = ?');
      params.push(cluster);
    }
    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY unit_number ASC';

    const stmt = context.env.DB.prepare(query);
    const { results } = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();

    // Summary counters
    const countQuery = await context.env.DB.prepare(
      'SELECT status, COUNT(*) as count FROM units GROUP BY status'
    ).all();

    return new Response(JSON.stringify({ 
      units: results || [],
      summary: countQuery.results || []
    }), {
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
    const { unit_id, action, sales_name, buyer_name } = body;

    // action: 'HOLD' | 'RELEASE' | 'BOOK' | 'SELL'
    if (!unit_id || !action) {
      return new Response(JSON.stringify({ error: 'unit_id and action are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const current = await context.env.DB.prepare('SELECT * FROM units WHERE id = ?').bind(unit_id).first() as any;
    if (!current) {
      return new Response(JSON.stringify({ error: 'Unit not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const now = Math.floor(Date.now() / 1000);

    if (action === 'HOLD') {
      if (current.status !== 'AVAILABLE') {
        return new Response(JSON.stringify({ 
          error: `Unit cannot be held. Current status is ${current.status} by ${current.held_by_sales || 'another party'}` 
        }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Lock for 24 hours (86400 seconds)
      const expiresAt = now + 86400;
      await context.env.DB.prepare(`
        UPDATE units SET status = 'HOLD', held_by_sales = ?, hold_expires_at = ?, buyer_name = ?, updated_at = ?
        WHERE id = ? AND status = 'AVAILABLE'
      `).bind(sales_name || 'Sales Staff', expiresAt, buyer_name || null, now, unit_id).run();

      return new Response(JSON.stringify({ success: true, status: 'HOLD', unit_id }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (action === 'RELEASE') {
      await context.env.DB.prepare(`
        UPDATE units SET status = 'AVAILABLE', held_by_sales = NULL, hold_expires_at = NULL, buyer_name = NULL, updated_at = ?
        WHERE id = ?
      `).bind(now, unit_id).run();

      return new Response(JSON.stringify({ success: true, status: 'AVAILABLE', unit_id }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (action === 'BOOK') {
      await context.env.DB.prepare(`
        UPDATE units SET status = 'BOOKED', held_by_sales = ?, buyer_name = ?, updated_at = ?
        WHERE id = ?
      `).bind(sales_name || current.held_by_sales, buyer_name || current.buyer_name, now, unit_id).run();

      return new Response(JSON.stringify({ success: true, status: 'BOOKED', unit_id }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (action === 'SELL') {
      await context.env.DB.prepare(`
        UPDATE units SET status = 'SOLD', buyer_name = ?, updated_at = ?
        WHERE id = ?
      `).bind(buyer_name || current.buyer_name || 'Private Client', now, unit_id).run();

      return new Response(JSON.stringify({ success: true, status: 'SOLD', unit_id }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    return new Response(JSON.stringify({ error: `Unsupported action: ${action}` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
