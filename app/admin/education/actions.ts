'use server'

import { updateItem, deleteItem } from '@/lib/json-store'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function approveEducation(id: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await updateItem('education', id, {
    approved: true,
    approvedAt: new Date().toISOString(),
    approvedBy: session.id
  })
}

export async function rejectEducation(id: string, reason: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await updateItem('education', id, {
    approved: false,
    rejected: true,
    rejectedAt: new Date().toISOString(),
    rejectionReason: reason,
    rejectedBy: session.id
  })
}

export async function deleteEducation(id: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await deleteItem('education', id)
}
