import { redirect } from 'next/navigation'

import { dbConnect , } from '@/lib/db';
const collection = await dbConnect('tourism_dashboard', 'tourismdata')


export default function Home() {
  redirect('/dashboard')
}