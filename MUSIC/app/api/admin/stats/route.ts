import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const [totalUsers, totalMusic, totalVideos, totalRevenue] = await Promise.all([
      prisma.user.count(),
      prisma.music.count(),
      prisma.video.count(),
      prisma.subscription.aggregate({
        _sum: {
          amount: true,
        },
      }),
    ])

    return NextResponse.json({
      totalUsers,
      totalMusic,
      totalVideos,
      totalRevenue: totalRevenue._sum.amount || 0,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

