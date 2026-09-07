import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <h1 className="text-xl font-bold">🌾 ገበሬ AI</h1>
          <p className="mt-2 opacity-90">Hello, {profile?.name || 'Farmer'} 👋</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow mt-4">
          <p className="text-gray-600">Dashboard content coming in Batch 2 — Farm Setup next.</p>
        </div>
        <form action="/api/auth/signout" method="post" className="mt-4">
          <button className="w-full border border-blue-300 text-blue-700 font-semibold py-3 rounded-lg">
            Log out
          </button>
        </form>
      </div>
    </main>
  );
}