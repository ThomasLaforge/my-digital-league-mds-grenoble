import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Context = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params;
  const session = await auth();

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      game: { select: { id: true, title: true } },
      _count: { select: { participants: true } },
    },
  });

  if (!event) {
    return NextResponse.json(
      { error: "Événement introuvable" },
      { status: 404 }
    );
  }

  // Vérifier si l'utilisateur est inscrit
  let isUserRegistered = false;
  if (session?.user?.id) {
    const participant = await prisma.participant.findUnique({
      where: { userId_eventId: { userId: session.user.id, eventId: id } },
    });
    isUserRegistered = !!participant;
  }

  return NextResponse.json({
    ...event,
    isUserRegistered,
  });
}

export const PUT = auth(async (req, context) => {
  if (!req.auth?.user?.isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const { id } = await (context as Context).params;
  const body = await req.json();
  const { name, date, inscriptionDeadline, rules, gameId } = body;

  const event = await prisma.event.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(date && { date: new Date(date) }),
      ...(inscriptionDeadline && {
        inscriptionDeadline: new Date(inscriptionDeadline),
      }),
      ...(rules && { rules }),
      ...(gameId && { gameId }),
    },
    include: {
      game: { select: { id: true, title: true } },
      _count: { select: { participants: true } },
    },
  });

  return NextResponse.json(event);
});

export const DELETE = auth(async (req, context) => {
  if (!req.auth?.user?.isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const { id } = await (context as Context).params;

  await prisma.event.delete({ where: { id } });

  return NextResponse.json({ success: true });
});
