const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
});

export const onRequestGet = async () => json({
  ok: true,
  service: 'nakaja-bikes-pages-functions',
});
