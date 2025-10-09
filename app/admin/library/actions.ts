'use server'

import { updateItem, deleteItem } from '@/lib/json-store'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function approveLibrary(id: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await updateItem('library', id, {
    approved: true,
    approvedAt: new Date().toISOString(),
    approvedBy: session.id
  })
}

export async function rejectLibrary(id: string, reason: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await updateItem('library', id, {
    approved: false,
    rejected: true,
    rejectedAt: new Date().toISOString(),
    rejectionReason: reason,
    rejectedBy: session.id
  })
}

export async function deleteLibrary(id: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await deleteItem('library', id)
}
