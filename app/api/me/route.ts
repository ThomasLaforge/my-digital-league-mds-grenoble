import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const userSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  image: true,
  isOrga: true,
  participations: {
    include: {
      event: {
        select: {
          id: true,
          name: true,
          date: true,
          game: {
            select: {
              title: true,
            },
          },
        },
      },
      results: {
        select: {
          score: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: "desc" as const,
        },
        take: 1,
      },
    },
  },
  adminEvents: {
    select: { id: true, name: true, date: true },
  },
};

export const GET = auth(async (req) => {
  const session = req.auth;

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: userSelect,
  });

  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur introuvable" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
});

export const PATCH = auth(async (req) => {
  const session = req.auth;

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { image, name } = await req.json();

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(name !== undefined && { name: name || null }),
      ...(image !== undefined && { image: image || null }),
    },
    select: userSelect,
  });

  return NextResponse.json(updated);
});
