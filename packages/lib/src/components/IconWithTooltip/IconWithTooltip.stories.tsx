import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import IconWithTooltip from "./index";

const meta = {
  component: IconWithTooltip,
  tags: ["ai-generated"],
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    glyph: "InfoWithCircle",
    children: "This is helpful tooltip text",
  },
  play: async ({ canvas }) => {
    const icon = canvas.getByRole("img");
    await expect(icon).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: "Warning",
    children: "This action may have consequences",
  },
  play: async ({ canvas }) => {
    const icon = canvas.getByRole("img");
    await expect(icon).toBeVisible();
  },
};

export const HoverToShowTooltip: Story = {
  args: {
    glyph: "QuestionMarkWithCircle",
    children: "Hover tooltip content",
  },
  play: async ({ canvas, userEvent }) => {
    const icon = canvas.getByRole("img");
    await expect(icon).toBeVisible();
    await userEvent.hover(icon);
  },
};
