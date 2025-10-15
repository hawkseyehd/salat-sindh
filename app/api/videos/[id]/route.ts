import { NextRequest, NextResponse } from 'next/server'
import { getItem } from '@/lib/json-store'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const video = await getItem('videos', params.id)
    
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }
    
    return NextResponse.json(video)
  } catch (error) {
    console.error('Error fetching video:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
