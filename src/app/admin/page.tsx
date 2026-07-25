import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/auth';
import LeadsClient from './LeadsClient';

export const metadata = {
  title: 'Admin Dashboard | LeadDesk Mini',
};

export default async function AdminDashboard() {
  const session = await verifyAuth();
  
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="admin-container">
      <LeadsClient />
    </div>
  );
}
