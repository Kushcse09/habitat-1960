import { stats } from '@/lib/regions'
export async function GET() { return Response.json(stats()) }
