import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies(); // ✅ FIX
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return Response.json({ user: decoded });
  } catch {
    return Response.json({ user: null });
  }
}
