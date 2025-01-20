import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="space-y-3">
                <Link href="/admin/users">
                    <button className="px-4 py-2 bg-blue-500 text-white">Manage Users</button>
                </Link>
                <Link href="/admin/tasks">
                    <button className="px-4 py-2 bg-green-500 text-white">Manage Tasks</button>
                </Link>
            </div>
        </div>
    );
}
