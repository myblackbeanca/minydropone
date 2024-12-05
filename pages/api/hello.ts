// app/api/hello/route.ts
export const runtime = 'edge';

export default async function GET(request: Request): Promise<Response> {
  return new Response(JSON.stringify({ name: "John1 Doe" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}