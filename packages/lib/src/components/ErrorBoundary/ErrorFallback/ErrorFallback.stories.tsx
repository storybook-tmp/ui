import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import ErrorFallback from "./ErrorFallback";

const meta = {
  component: ErrorFallback,
  tags: ["ai-generated"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ErrorFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    homeURL: "/",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Error")).toBeVisible();
    await expect(canvas.getByText(/sorry about that/i)).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: /back to home/i }),
    ).toBeVisible();
  },
};

export const CustomHomeURL: Story = {
  args: {
    homeURL: "/dashboard",
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: /back to home/i });
    await expect(link).toHaveAttribute("href", "/dashboard");
  },
};

export const CssCheck: Story = {
  args: {
    homeURL: "/",
  },
  play: async ({ canvasElement }) => {
    // The Center div uses background-color: #5bbf7d and data-cy="error-fallback"
    const outerContainer = canvasElement.querySelector(
      '[data-cy="error-fallback"]',
    );
    await expect(outerContainer).not.toBeNull();
    const bgColor = getComputedStyle(outerContainer!).backgroundColor;
    await expect(bgColor).toBe("rgb(91, 191, 125)");
  },
};
