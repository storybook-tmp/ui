import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import IconWithTooltip from ".";

const meta = {
  component: IconWithTooltip,
  tags: ["ai-generated", "needs-work"],
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WarningTooltip: Story = {
  args: {
    "data-cy": "warning-icon",
    glyph: "Warning",
    children: "This task has warnings",
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByLabelText("Warning Icon");
    await expect(trigger).toBeVisible();
    await expect(canvas.queryByText("This task has warnings")).toBeNull();
  },
};

export const InfoTooltip: Story = {
  args: {
    "data-cy": "info-icon",
    glyph: "InfoWithCircle",
    children: "Patch metadata is available",
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByLabelText("Info With Circle Icon");
    await expect(trigger).toBeVisible();
    await expect(canvas.queryByText("Patch metadata is available")).toBeNull();
  },
};
