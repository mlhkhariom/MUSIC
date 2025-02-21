"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function Dashboard() {
  const { data: session } = useSession()
  const [releases, setReleases] = useState([])
  const [stats, setStats] = useState({
    totalStreams: 0,
    totalRevenue: 0,
    recentReleases: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      const releasesResponse = await fetch("/api/releases")
      const releasesData = await releasesResponse.json()
      setReleases(releasesData.slice(0, 5)) // Get only the 5 most recent releases

      const statsResponse = await fetch("/api/stats")
      const statsData = await statsResponse.json()
      setStats(statsData)
    }

    fetchData()
  }, [])

  const chartData = [
    { name: "Streams", value: stats.totalStreams },
    { name: "Revenue ($)", value: stats.totalRevenue },
    { name: "Recent Releases", value: stats.recentReleases },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {session?.user?.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Streams</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalStreams.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Releases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.recentReleases}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Releases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {releases.map((release) => (
                <TableRow key={release.id}>
                  <TableCell>{release.title}</TableCell>
                  <TableCell>{release.type}</TableCell>
                  <TableCell>{new Date(release.releaseDate).toLocaleDateString()}</TableCell>
                  <TableCell>{release.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Link href="/releases">
              <Button>View All Releases</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

