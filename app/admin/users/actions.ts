'use server'

import { updateItem, deleteItem } from '@/lib/json-store'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function updateUserRole(userId: string, newRole: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await updateItem('users', userId, { 
    role: newRole, 
    updatedAt: new Date().toISOString() 
  })
}

export async function updateUserStatus(userId: string, newStatus: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await updateItem('users', userId, { 
    status: newStatus, 
    updatedAt: new Date().toISOString() 
  })
}

export async function deleteUser(userId: string) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  await deleteItem('users', userId)
}
