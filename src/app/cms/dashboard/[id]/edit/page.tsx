"use client";

import { useParams } from 'next/navigation'
import EditJournal from '@/components/EditJournal'

export default function EditJournalPage() {
  const params = useParams()
  const id = params.id as string

  if (!id) return <div>Loading...</div>

  return (
    <div className="container mx-auto">
      <EditJournal journalId={Number(id)} />
    </div>
  )
}