import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const settings = await prisma.adminSettings.findMany()
    const settingsObject = settings.reduce((acc, setting) => {
      acc[setting.settingKey] = setting.settingValue
      return acc
    }, {})
    return NextResponse.json(settingsObject)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  const settings = await request.json()

  try {
    for (const [key, value] of Object.entries(settings)) {
      await prisma.adminSettings.upsert({
        where: { settingKey: key },
        update: { settingValue: value },
        create: { settingKey: key, settingValue: value },
      })
    }
    return NextResponse.json({ message: "Settings updated successfully" })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

