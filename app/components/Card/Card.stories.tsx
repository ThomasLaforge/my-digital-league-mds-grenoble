import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Card, { BaseCard } from "./Card";
import { BulbIcon } from "../Icons/Icons";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    id: "base-event",
    name: "Base card",
    date: new Date("2026-03-15T14:00:00"),
    inscriptionDeadline: new Date("2026-03-10T23:59:59"),
    rules: "base rules",
    gameId: "base-game",
    createdAt: new Date("2026-02-26T09:00:00"),
    updatedAt: new Date("2026-02-26T09:00:00"),
  },
  render: () => (
    <BaseCard>
      <div style={{ height: "100px" }} />
    </BaseCard>
  ),
};

const baseArgs = {
  id: "event-1",
  name: "Rocket League – Aerial Cup",
  description:
    "48 heures pour creer un jeu video en equipe. Creativite, collaboration et passion au rendez-vous.",
  date: new Date("2026-03-15T14:00:00"),
  inscriptionDeadline: new Date("2026-03-10T23:59:59"),
  rules: "Be respectful and creative",
  gameId: "game-1",
  createdAt: new Date("2026-02-26T09:00:00"),
  updatedAt: new Date("2026-02-26T09:00:00"),
};

export const Minimale: Story = {
  args: {
    ...baseArgs,
    variant: "minimale",
    status: "upcoming",
    icon: <BulbIcon />,
  },
};

export const Register: Story = {
  args: {
    ...baseArgs,
    variant: "register",
    status: "ongoing",
    icon: <BulbIcon />,
    heure: "14h00",
    lieu: "MyDigitalSchool",
  },
};

export const Featured: Story = {
  args: {
    ...baseArgs,
    variant: "featured",
    status: "upcoming",
    icon: <BulbIcon />,
    duration: "2 jours",
    animatedBy: "Stella @ MyDigitalSchool",
  },
};
