import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Roadmap } from "./Roadmap";

const meta: Meta<typeof Roadmap> = {
  title: "Components/Roadmap",
  component: Roadmap,
};

export default meta;
type Story = StoryObj<typeof Roadmap>;

export const Default: Story = {
  args: {
    title: "Roadmap du Projet",
    steps: [
      {
        id: "1",
        title: "Ouverture des inscriptions - Révélation du Thème",
        description: "Cérémonie d'ouverture en direct à regarder.",
        isCompleted: true,
        date: new Date("2026-03-20T18:00:00"),
        isUpcoming: true,
      },
      {
        id: "2",
        title: "Ouverture des inscriptions - Révélation du Thème",
        description: "Cérémonie d'ouverture en direct à regarder.",
        isCompleted: false,
        date: new Date("2026-03-20T18:00:00"),
        isUpcoming: false,
      },
      {
        id: "3",
        title: "Ouverture des inscriptions - Révélation du Thème",
        description: "Cérémonie d'ouverture en direct à regarder.",
        isCompleted: false,
        date: new Date("2026-03-20T18:00:00"),
        isUpcoming: true,
      },
    ],
  },
};
