import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  try {
    let releases
    if (type === "music") {
      releases = await prisma.music.findMany({
        where: { artistId: session.user.id },
        orderBy: { createdAt: "desc" },
      })
    } else if (type === "video") {
      releases = await prisma.video.findMany({
        where: { artistId: session.user.id },
        orderBy: { createdAt: "desc" },
      })
    } else {
      const musicReleases = await prisma.music.findMany({
        where: { artistId: session.user.id },
        orderBy: { createdAt: "desc" },
      })
      const videoReleases = await prisma.video.findMany({
        where: { artistId: session.user.id },
        orderBy: { createdAt: "desc" },
      })
      releases = [...musicReleases, ...videoReleases].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }

    return NextResponse.json(releases)
  } catch (error) {
    console.error("Error fetching releases:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { type, title, audioFile, videoFile, coverArt, thumbnail, isrc, genre, releaseDate } = await request.json()

    let release
    if (type === "music") {
      release = await prisma.music.create({
        data: {
          title,
          audioFile,
          coverArt,
          isrc,
          genre,
          releaseDate: new Date(releaseDate),
          artist: { connect: { id: session.user.id } },
        },
      })
    } else if (type === "video") {
      release = await prisma.video.create({
        data: {
          title,
          videoFile,
          thumbnail,
          isrc,
          genre,
          releaseDate: new Date(releaseDate),
          artist: { connect: { id: session.user.id } },
        },
      })
    } else {
      return NextResponse.json({ error: "Invalid release type" }, { status: 400 })
    }

    return NextResponse.json(release)
  } catch (error) {
    console.error("Error creating release:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

