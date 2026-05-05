import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import Pagination from "./index";

const meta = {
  component: Pagination,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1 / 5")).toBeVisible();
    const prevButton = canvas.getByRole("button", { name: /chevron left/i });
    await expect(prevButton).toHaveAttribute("aria-disabled", "true");
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 2,
    totalResults: 50,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("3 / 5")).toBeVisible();
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
    totalResults: 50,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("5 / 5")).toBeVisible();
    const nextButton = canvas.getByRole("button", { name: /chevron right/i });
    await expect(nextButton).toHaveAttribute("aria-disabled", "true");
  },
};
