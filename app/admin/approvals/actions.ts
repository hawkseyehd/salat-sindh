'use server'

import { updateItem } from '@/lib/json-store'
import { getSession, canApproveContent, canRejectContent } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function approveContent(id: string, type: string) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  // Check if user has permission to approve content
  if (!(await canApproveContent())) {
    redirect('/')
  }

  const fileBaseName = type === 'podcast' ? 'podcast' : type + 's'
  
  await updateItem(fileBaseName, id, {
    approved: true,
    approvedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    approvedBy: session.id
  })
}

export async function rejectContent(id: string, type: string, reason: string) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  // Check if user has permission to reject content
  if (!(await canRejectContent())) {
    redirect('/')
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

export async function approveUser(userId: string) {
  const session = await getSession()
  if (!session || (session.role !== 'admin' && session.role !== 'team')) {
    redirect('/login')
  }

  await updateItem('users', userId, {
    verified: true,
    status: 'active',
    verifiedAt: new Date().toISOString(),
    verifiedBy: session.id
  })
}

export async function rejectUser(userId: string) {
  const session = await getSession()
  if (!session || (session.role !== 'admin' && session.role !== 'team')) {
    redirect('/login')
  }

  await updateItem('users', userId, {
    verified: false,
    status: 'rejected',
    rejectedAt: new Date().toISOString(),
    rejectedBy: session.id
  })
}