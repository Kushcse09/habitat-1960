import { addReport, getReports } from '@/lib/regions'
export async function GET() { return Response.json(getReports()) }
export async function POST(request: Request) { const body = await request.json(); if (!body.locationName || !body.description || !Number.isFinite(Number(body.lat)) || !Number.isFinite(Number(body.lng))) return Response.json({ error: 'Invalid report' }, { status: 400 }); return Response.json(addReport({ ...body, lat: Number(body.lat), lng: Number(body.lng) }), { status: 201 }) }
