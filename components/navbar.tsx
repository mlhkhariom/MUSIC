import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Music Distribution CMS
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/upload">
            <Button variant="ghost">Upload</Button>
          </Link>
          <Link href="/releases">
            <Button variant="ghost">Releases</Button>
          </Link>
          <Link href="/analytics">
            <Button variant="ghost">Analytics</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

