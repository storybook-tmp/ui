import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import IconWithTooltip from "./index";

const meta = {
  component: IconWithTooltip,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoIcon: Story = {
  args: {
    glyph: "InfoWithCircle",
    children: "This is helpful information",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("img", { name: /info with circle/i }),
    ).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: "Warning",
    children: "This action may have consequences",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("img", { name: /warning/i }),
    ).toBeVisible();
  },
};

export const QuestionIcon: Story = {
  args: {
    glyph: "QuestionMarkWithCircle",
    children: "Need help? Check the documentation.",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("img", { name: /question mark with circle/i }),
    ).toBeVisible();
  },
};
