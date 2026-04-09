// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";
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
        date: "20 Mars",
        heure: "18:00",
        isUpcoming: true,
      },
      {
        id: "1",
        title: "Ouverture des inscriptions - Révélation du Thème",
        description: "Cérémonie d'ouverture en direct à regarder.",
        isCompleted: false,
        date: "20 Mars",
        heure: "18:00",
        isUpcoming: false,
      },
      {
        id: "1",
        title: "Ouverture des inscriptions - Révélation du Thème",
        description: "Cérémonie d'ouverture en direct à regarder.",
        isCompleted: false,
        date: "20 Mars",
        heure: "18:00",
        isUpcoming: true,
      },
    ],
  },
};
