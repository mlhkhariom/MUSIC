import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const musicReleases = await prisma.music.findMany({
      include: { artist: { select: { name: true } } },
    })
    const videoReleases = await prisma.video.findMany({
      include: { artist: { select: { name: true } } },
    })

    const releases = [
      ...musicReleases.map((r) => ({ ...r, type: "MUSIC" })),
      ...videoReleases.map((r) => ({ ...r, type: "VIDEO" })),
    ]

    return NextResponse.json(releases)
  } catch (error) {
    console.error("Error fetching releases:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function PATCH(request: Request) {
  const { id, status, type } = await request.json()

  try {
    let updatedRelease
    if (type === "MUSIC") {
      updatedRelease = await prisma.music.update({
        where: { id },
        data: { status },
      })
    } else if (type === "VIDEO") {
      updatedRelease = await prisma.video.update({
        where: { id },
        data: { status },
      })
    }
    return NextResponse.json(updatedRelease)
  } catch (error) {
    console.error("Error updating release:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

