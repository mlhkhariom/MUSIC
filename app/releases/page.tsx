import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockReleases = [
  {
    id: 1,
    title: "Summer Vibes",
    artist: "DJ Cool",
    releaseDate: "2023-06-15",
    status: "Live",
  },
  {
    id: 2,
    title: "Midnight Dreams",
    artist: "Luna",
    releaseDate: "2023-07-01",
    status: "Pending",
  },
  {
    id: 3,
    title: "Electric Pulse",
    artist: "Neon Lights",
    releaseDate: "2023-08-12",
    status: "Draft",
  },
]

export default function ReleasesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Releases</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockReleases.map((release) => (
            <TableRow key={release.id}>
              <TableCell>{release.title}</TableCell>
              <TableCell>{release.artist}</TableCell>
              <TableCell>{release.releaseDate}</TableCell>
              <TableCell>{release.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

