'use server'

import { updateItem } from '@/lib/json-store'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function approveContent(id: string, type: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  const fileBaseName = type === 'podcast' ? 'podcast' : type + 's'
  
  await updateItem(fileBaseName, id, {
    approved: true,
    approvedAt: new Date().toISOString(),
    approvedBy: session.id
  })
}

export async function rejectContent(id: string, type: string, reason: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  const fileBaseName = type === 'podcast' ? 'podcast' : type + 's'
  
  await updateItem(fileBaseName, id, {
    approved: false,
    rejected: true,
    rejectedAt: new Date().toISOString(),
    rejectionReason: reason,
    rejectedBy: session.id
  })
}
