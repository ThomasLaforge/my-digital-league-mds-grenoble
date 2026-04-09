import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const userSelect = {
  id: true,
  name: true,
  image: true,
  isOrga: true,
  participations: {
    include: {
      event: {
        select: { id: true, name: true, date: true },
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

  // TODO: ajouter `description` quand l'UX valide le champ
  const { image } = await req.json();

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(image !== undefined && { image: image || null }),
    },
    select: userSelect,
  });

  return NextResponse.json(updated);
});
