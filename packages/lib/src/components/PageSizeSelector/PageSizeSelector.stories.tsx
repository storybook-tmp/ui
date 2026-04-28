import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import PageSizeSelector from "./index";

const meta: Meta<typeof PageSizeSelector> = {
  component: PageSizeSelector,
  tags: ["ai-generated"],
};

export default meta;
type Story = StoryObj<typeof PageSizeSelector>;

export const Default: Story = {
  args: {
    value: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole("button", { name: /10 \/ page/i });
    await expect(select).toBeVisible();
  },
};

export const LargePageSize: Story = {
  args: {
    value: 100,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole("button", { name: /100 \/ page/i });
    await expect(select).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    value: 20,
    onChange: fn(),
    disabled: true,
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole("button", { name: /20 \/ page/i });
    await expect(select).toHaveAttribute("aria-disabled", "true");
  },
};
