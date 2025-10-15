import { listItems } from '@/lib/json-store'
import { VideoAdminClient } from './video-admin-client'

export default async function AdminVideosPage() {
  const videos = await listItems('videos')

  return <VideoAdminClient videos={videos} />
}
