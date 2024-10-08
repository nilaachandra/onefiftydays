'use server'

import { db } from "@/lib/db"
import { auth } from "@/app/lib/auth"

export async function deleteJournal(journalId: number) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' }
    }

    await db.journal.delete({
      where: { id: journalId },
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to delete journal:', error)
    return { success: false, error: 'Failed to delete journal' }
  }
}

export async function archiveJournal(journalId: number) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' }
    }

    const updatedJournal = await db.journal.update({
      where: { id: journalId },
      data: { status: 'ARCHIVED' },
    })

    return { success: true, journal: updatedJournal }
  } catch (error) {
    console.error('Failed to archive journal:', error)
    return { success: false, error: 'Failed to archive journal' }
  }
}

export async function publishJournal(journalId: number) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' }
    }

    const updatedJournal = await db.journal.update({
      where: { id: journalId },
      data: { 
        status: 'PUBLISHED',
        publishedAt: new Date()
      },
    })

    return { success: true, journal: updatedJournal }
  } catch (error) {
    console.error('Failed to publish journal:', error)
    return { success: false, error: 'Failed to publish journal' }
  }
}