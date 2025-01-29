import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // Here you would typically make a call to your AI service
    // For now, we'll just echo back a simple response
    return NextResponse.json({
      content: "Hello! I'm Valentin XV. How can I help you today?",
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}