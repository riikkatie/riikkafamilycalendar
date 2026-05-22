import { NextRequest, NextResponse } from "next/server";
import { addCategory, getCategories } from "@/lib/repository";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const payload = await request.json();

  if (!payload.name || typeof payload.name !== "string") {
    return NextResponse.json({ error: "Category name is required" }, { status: 400 });
  }

  const created = await addCategory({
    name: payload.name,
    color: payload.color,
    icon: payload.icon,
  });

  return NextResponse.json(created, { status: 201 });
}
