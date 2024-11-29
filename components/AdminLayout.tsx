import { ReactNode } from 'react';
import AdminNavbar from './AdminNavbar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminNavbar />
      <div className="md:pl-64">
        <main className="min-h-screen mt-16 md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
