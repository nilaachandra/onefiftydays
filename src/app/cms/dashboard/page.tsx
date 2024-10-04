import { auth, signOut } from "@/app/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return null; // or redirect to login
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className=" p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">CMS Dashboard</h1>
        <p className="text-center mb-6">Welcome, {session.user?.name}!</p>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
