"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box, Text } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMusic: 0,
    totalVideos: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      setStats(data)
    }
    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Music</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalMusic}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalVideos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/users">
              <Button className="w-full">Manage Users</Button>
            </Link>
            <Link href="/admin/releases">
              <Button className="w-full">Manage Releases</Button>
            </Link>
            <Link href="/admin/settings">
              <Button className="w-full">System Settings</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Canvas>
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <Box args={[1, stats.totalUsers / 100, 1]} position={[-1.5, 0, 0]}>
                  <meshStandardMaterial color="hotpink" />
                </Box>
                <Box args={[1, stats.totalMusic / 10, 1]} position={[0, 0, 0]}>
                  <meshStandardMaterial color="lightblue" />
                </Box>
                <Box args={[1, stats.totalVideos / 10, 1]} position={[1.5, 0, 0]}>
                  <meshStandardMaterial color="lightgreen" />
                </Box>
                <Text position={[-1.5, -1, 0]} fontSize={0.2}>
                  Users
                </Text>
                <Text position={[0, -1, 0]} fontSize={0.2}>
                  Music
                </Text>
                <Text position={[1.5, -1, 0]} fontSize={0.2}>
                  Videos
                </Text>
              </Canvas>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

