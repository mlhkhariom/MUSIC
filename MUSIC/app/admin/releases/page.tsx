"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminReleases() {
  const [releases, setReleases] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchReleases()
  }, [])

  const fetchReleases = async () => {
    const response = await fetch("/api/admin/releases")
    const data = await response.json()
    setReleases(data)
  }

  const handleStatusChange = async (releaseId, newStatus) => {
    await fetch(`/api/admin/releases/${releaseId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    fetchReleases()
  }

  const filteredReleases = releases.filter(
    (release) =>
      release.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (typeFilter === "all" || release.type === typeFilter) &&
      (statusFilter === "all" || release.status === statusFilter),
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Release Management</h1>
      <div className="flex space-x-4">
        <Input
          placeholder="Search releases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="MUSIC">Music</SelectItem>
            <SelectItem value="VIDEO">Video</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReleases.map((release) => (
            <TableRow key={release.id}>
              <TableCell>{release.title}</TableCell>
              <TableCell>{release.artist.name}</TableCell>
              <TableCell>{release.type}</TableCell>
              <TableCell>
                <Select value={release.status} onValueChange={(newStatus) => handleStatusChange(release.id, newStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => window.open(`/admin/releases/${release.id}`, "_blank")}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

