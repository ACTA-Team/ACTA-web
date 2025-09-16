import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, company, message } = body

    // In a real app, you would save this to a database
    console.log("New lead:", { email, company, message })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully",
    })
  } catch {
    return NextResponse.json({ success: false, message: "Failed to submit lead" }, { status: 500 })
  }
}
