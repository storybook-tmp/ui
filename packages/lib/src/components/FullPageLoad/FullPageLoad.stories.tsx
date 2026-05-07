import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { FullPageLoad } from ".";

const meta = {
  component: FullPageLoad,
  tags: ["ai-generated"],
} satisfies Meta<typeof FullPageLoad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("LOADING...")).toBeVisible();
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const loadingPage = canvas.getByText("LOADING...").parentElement;
    await expect(loadingPage).toBeVisible();
    expect(getComputedStyle(loadingPage!).display).toBe("flex");
    expect(getComputedStyle(loadingPage!).alignItems).toBe("center");
  },
};
