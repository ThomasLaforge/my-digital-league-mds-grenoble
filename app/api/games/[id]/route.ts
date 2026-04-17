import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Context = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params;

  const game = await prisma.game.findUnique({
    where: { id },
    include: { _count: { select: { events: true } } },
  });

  if (!game) {
    return NextResponse.json({ error: "Jeu introuvable" }, { status: 404 });
  }

  return NextResponse.json(game);
}

export const PUT = auth(async (req, context) => {
  if (!req.auth?.user?.isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const { id } = await (context as Context).params;
  const { title, description, imageUrl } = await req.json();

  const game = await prisma.game.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(description !== undefined && { description: description || null }),
      ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
    },
    include: { _count: { select: { events: true } } },
  });

  return NextResponse.json(game);
});

export const DELETE = auth(async (req, context) => {
  if (!req.auth?.user?.isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const { id } = await (context as Context).params;

  await prisma.game.delete({ where: { id } });

  return NextResponse.json({ success: true });
});
