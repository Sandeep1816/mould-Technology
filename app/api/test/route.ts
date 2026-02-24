export async function GET() {
  const names: string[] = []

  return Response.json({
    message: "Test route working",
    names,
  })
}