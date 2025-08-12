
// export async function GET(){
//  return Response.json(
//     {
//     response: "todo ok!" }
// )
// }

    
import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  try {
    const res = await fetch(`${backendUrl}/products?search=${encodeURIComponent(search)}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error en la API externa" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: "Error de conexión" }, { status: 500 });
  }
}