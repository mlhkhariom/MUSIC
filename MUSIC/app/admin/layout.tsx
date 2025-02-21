import type React from "react"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session?.user?.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <a href="/admin" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            Dashboard
          </a>
          <a href="/admin/users" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            Users
          </a>
          <a href="/admin/releases" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            Releases
          </a>
          <a href="/admin/settings" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            Settings
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  )
}

