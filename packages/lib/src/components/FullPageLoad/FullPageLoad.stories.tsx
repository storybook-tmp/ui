import type { Meta, StoryObj } from "@storybook/react-vite";
import { FullPageLoad } from ".";

const meta = {
  title: "AI Generated/Simple/FullPageLoad",
  component: FullPageLoad,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FullPageLoad>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Framed: Story = {
  parameters: {
    layout: "padded",
  },
};
