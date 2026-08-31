import { regions } from '@/lib/regions'
export async function GET() { return Response.json(regions) }
