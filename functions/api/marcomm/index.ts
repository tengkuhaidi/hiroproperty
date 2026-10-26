/// <reference types="@cloudflare/workers-types" />

// Cloudflare Pages Functions - /api/marcomm
// Marcomm Cashflow & Realisasi Budget + LPJ Auto-reconciliation
// GET: list expenses, category breakdown, & total LPJ status
// POST: submit receipt expense with R2 attachment link

interface Env {
  DB: D1Database;
  STORAGE: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const mode = url.searchParams.get('mode');

    // Aggregate summary for Budget & LPJ
    if (mode === 'summary') {
      const totalSpend = await context.env.DB.prepare('SELECT SUM(amount_idr) as total FROM marcomm_expenses').first();
      const byCategory = await context.env.DB.prepare(
        'SELECT category, SUM(amount_idr) as total, COUNT(*) as count FROM marcomm_expenses GROUP BY category'
      ).all();
      const byLpj = await context.env.DB.prepare(
        'SELECT lpj_status, SUM(amount_idr) as total, COUNT(*) as count FROM marcomm_expenses GROUP BY lpj_status'
      ).all();

      return new Response(JSON.stringify({
        total_spend: (totalSpend as any)?.total || 0,
        by_category: byCategory.results || [],
        by_lpj_status: byLpj.results || [],
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const { results } = await context.env.DB.prepare(
      'SELECT * FROM marcomm_expenses ORDER BY expense_date DESC'
    ).all();

    return new Response(JSON.stringify({ expenses: results || [] }), {
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
      expense_date, 
      category, 
      title, 
      amount_idr, 
      receipt_url, 
      paid_by, 
      payment_method, 
      notes 
    } = body;

    if (!title || !amount_idr || !category) {
      return new Response(JSON.stringify({ error: 'title, amount_idr, and category are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const id = 'exp-' + Date.now().toString(36);
    const now = Math.floor(Date.now() / 1000);
    const dateStr = expense_date || new Date().toISOString().split('T')[0];

    await context.env.DB.prepare(`
      INSERT INTO marcomm_expenses (
        id, expense_date, category, title, amount_idr, receipt_url,
        paid_by, payment_method, lpj_status, notes, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Submitted', ?, ?)
    `).bind(
      id,
      dateStr,
      category,
      title,
      parseInt(amount_idr, 10),
      receipt_url || null,
      paid_by || 'Marcomm Lead',
      payment_method || 'Corporate BCA',
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
