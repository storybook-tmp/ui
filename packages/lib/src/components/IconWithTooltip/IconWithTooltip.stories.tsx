import type { Meta, StoryObj } from "@storybook/react-vite";
import { palette } from "@leafygreen-ui/palette";
import IconWithTooltip from ".";

const meta = {
  title: "AI Generated/Medium/IconWithTooltip",
  component: IconWithTooltip,
} satisfies Meta<typeof IconWithTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  args: {
    children: "This task requires attention before it can proceed.",
    fill: palette.red.base,
    glyph: "Warning",
  },
};

export const Informational: Story = {
  args: {
    children: "New rollout details are available for this task group.",
    fill: palette.blue.base,
    glyph: "InfoWithCircle",
  },
};
