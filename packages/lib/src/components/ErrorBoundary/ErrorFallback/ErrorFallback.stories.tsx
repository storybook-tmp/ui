import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import ErrorFallback from "./ErrorFallback";

const meta = {
  component: ErrorFallback,
} satisfies Meta<typeof ErrorFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    homeURL: "/",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Error")).toBeVisible();
    await expect(canvas.getByText("Back To Home")).toHaveAttribute("href", "/");
  },
};

export const SpruceHome: Story = {
  args: {
    homeURL: "https://spruce.mongodb.com",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Ouch! That&apos;s gotta hurt,|Ouch! That's gotta hurt,/)).toBeVisible();
    await expect(canvas.getByText("Back To Home")).toHaveAttribute(
      "href",
      "https://spruce.mongodb.com",
    );
  },
};

export const ParsleyHome: Story = {
  args: {
    homeURL: "https://parsley.mongodb.com",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText("Error Background")).toBeVisible();
    await expect(canvas.getByText("Back To Home")).toHaveAttribute(
      "href",
      "https://parsley.mongodb.com",
    );
  },
};
