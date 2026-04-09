import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Link from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "Cliquez ici",
    href: "#",
  },
};
