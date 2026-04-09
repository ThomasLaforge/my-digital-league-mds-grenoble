import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CardIcon from "./CardIcon";

const meta = {
  title: "Components/CardIcon",
  component: CardIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CardIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "",
    title: "Hello :)",
    subtitle: "Come play with us !",
  },
};

export const Tournois: Story = {
  args: {
    icon: "",
    title: "Rassemblez vos coéquipiers",
    subtitle:
      "Faites équipe et participez à nos tournois pour gagner des prix incroyables !",
  },
};

export const Equipe: Story = {
  args: {
    icon: "",
    title: "Tournois communautaires",
    subtitle:
      "Devenez organisateur de tournois et créez des événements passionnants pour la communauté !",
  },
};
