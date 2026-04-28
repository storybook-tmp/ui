import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TablePlaceholder } from "./index";

const meta: Meta<typeof TablePlaceholder> = {
  component: TablePlaceholder,
  tags: ["ai-generated"],
};

export default meta;
type Story = StoryObj<typeof TablePlaceholder>;

export const Default: Story = {
  args: {
    message: "No data found.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("No data found.")).toBeVisible();
  },
};

export const WithCustomGlyph: Story = {
  args: {
    message: "No results match your filters.",
    glyph: "Warning",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText("No results match your filters."),
    ).toBeVisible();
  },
};

export const Spinning: Story = {
  args: {
    message: "Loading data...",
    spin: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Loading data...")).toBeVisible();
  },
};
