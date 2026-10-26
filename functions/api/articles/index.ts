/// <reference types="@cloudflare/workers-types" />

// Cloudflare Pages Functions - /api/articles
// GET: list or filter articles, POST: create new article

interface Env {
  DB: D1Database;
  STORAGE: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const slug = url.searchParams.get('slug');

    if (slug) {
      const article = await context.env.DB.prepare(
        'SELECT * FROM articles WHERE slug = ?'
      ).bind(slug).first();

      if (!article) {
        return new Response(JSON.stringify({ error: 'Article not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      // Increment view count asynchronously
      context.waitUntil(
        context.env.DB.prepare('UPDATE articles SET views = views + 1 WHERE slug = ?').bind(slug).run()
      );

      return new Response(JSON.stringify({ article }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // List all published articles
    const { results } = await context.env.DB.prepare(
      'SELECT id, slug, title, category, excerpt, cover_image, author, views, created_at FROM articles WHERE status = "published" ORDER BY created_at DESC'
    ).all();

    return new Response(JSON.stringify({ articles: results || [] }), {
      headers: { 
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60, s-maxage=300'
      }
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
    const { title, slug, category, excerpt, content, cover_image, author } = body;

    if (!title || !slug || !content) {
      return new Response(JSON.stringify({ error: 'title, slug, and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const id = 'art-' + Date.now().toString(36);
    const now = Math.floor(Date.now() / 1000);

    await context.env.DB.prepare(`
      INSERT INTO articles (id, slug, title, category, excerpt, content, cover_image, author, status, views, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published', 0, ?, ?)
    `).bind(
      id,
      slug,
      title,
      category || 'Market Insight',
      excerpt || '',
      content,
      cover_image || '/images/modern.jpg',
      author || 'Hiro Editorial Desk',
      now,
      now
    ).run();

    return new Response(JSON.stringify({ success: true, id, slug }), {
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
