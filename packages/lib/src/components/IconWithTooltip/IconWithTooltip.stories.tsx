import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import IconWithTooltip from ".";

const meta = {
  component: IconWithTooltip,
  tags: ["ai-generated"],
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    glyph: "InfoWithCircle",
    children: "This is helpful information.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img")).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: "Warning",
    children: "Warning: This action cannot be undone.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img")).toBeVisible();
  },
};

export const WithHoverTooltip: Story = {
  args: {
    glyph: "QuestionMarkWithCircle",
    children: "Hover tooltip content.",
  },
  play: async ({ canvas, userEvent }) => {
    const icon = canvas.getByRole("img");
    await expect(icon).toBeVisible();
    await userEvent.hover(icon);
  },
};
