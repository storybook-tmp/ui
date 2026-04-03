import type { Meta, StoryObj } from "@storybook/react-vite";
import IconWithTooltip from ".";

const meta = {
  title: "AI Generated/Medium/IconWithTooltip",
  component: IconWithTooltip,
  args: {
    glyph: "Warning",
    children: "This task needs attention.",
  },
} satisfies Meta<typeof IconWithTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Warning: Story = {};

export const InformationalCopy: Story = {
  args: {
    glyph: "InfoWithCircle",
    children:
      "This badge explains why the task is in a special state and gives extra context on hover.",
  },
};
