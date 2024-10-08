"use server"
import { db } from "@/lib/db";


//increment views
export async function incrementView(journalId: number) {
    try {
      await db.view.create({
        data: {
          journalId,
        }
      })
  
      const updatedJournal = await db.journal.findUnique({
        where: { id: journalId },
        include: { views: true },
      })
  
      return { 
        success: true, 
        viewCount: updatedJournal?.views.length || 0
      }
    } catch (error) {
      console.error('Failed to increment view:', error)
      return { success: false, error: 'Failed to increment view' }
    }
  }

//increment likes
export async function incrementLike(journalId: number, browserId: string) {
    try {
      const existingLike = await db.like.findUnique({
        where: {
          journalId_browserId: {
            journalId,
            browserId
          }
        }
      })
  
      if (existingLike) {
        // If the like already exists, we'll remove it (unlike)
        await db.like.delete({
          where: {
            id: existingLike.id
          }
        })
      } else {
        // If the like doesn't exist, we'll create it
        await db.like.create({
          data: {
            journalId,
            browserId
          }
        })
      }
  
      const updatedJournal = await db.journal.findUnique({
        where: { id: journalId },
        include: { likes: true },
      })
  
      return { 
        success: true, 
        likeCount: updatedJournal?.likes.length || 0,
        isLiked: !existingLike
      }
    } catch (error) {
      console.error('Failed to update like:', error)
      return { success: false, error: 'Failed to update like' }
    }
  }