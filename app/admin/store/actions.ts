'use server'

import { updateItem, deleteItem } from '@/lib/json-store'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function approveStore(id: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await updateItem('store', id, {
    approved: true,
    approvedAt: new Date().toISOString(),
    approvedBy: session.id
  })
}

export async function rejectStore(id: string, reason: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await updateItem('store', id, {
    approved: false,
    rejected: true,
    rejectedAt: new Date().toISOString(),
    rejectionReason: reason,
    rejectedBy: session.id
  })
}

export async function deleteStore(id: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await deleteItem('store', id)
}
