'use server'

import { updateItem, deleteItem } from '@/lib/json-store'
import { getSession, canManageUserRoles, canEditUsers, canDeleteUsers } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function updateUserRole(userId: string, newRole: string) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  // Check if user has permission to manage user roles
  if (!(await canManageUserRoles())) {
    redirect('/')
  }

  await updateItem('users', userId, { 
    role: newRole, 
    updatedAt: new Date().toISOString() 
  })
}

export async function updateUserStatus(userId: string, newStatus: string) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  // Check if user has permission to edit users
  if (!(await canEditUsers())) {
    redirect('/')
  }

  await updateItem('users', userId, { 
    status: newStatus, 
    updatedAt: new Date().toISOString() 
  })
}

export async function updateUserVerification(userId: string, verified: boolean) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  // Check if user has permission to edit users
  if (!(await canEditUsers())) {
    redirect('/')
  }

  await updateItem('users', userId, { 
    verified: verified, 
    updatedAt: new Date().toISOString() 
  })
}

export async function deleteUser(userId: string) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  // Check if user has permission to delete users
  if (!(await canDeleteUsers())) {
    redirect('/')
  }

  await deleteItem('users', userId)
}
