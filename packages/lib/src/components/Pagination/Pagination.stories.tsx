import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import Pagination from "./index";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  tags: ["ai-generated"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const FirstPage: Story = {
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1 / 5")).toBeVisible();
    // Previous button should be disabled on first page
    const buttons = canvas.getAllByRole("button");
    const prevButton = buttons[0];
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
    // Next button should be disabled on last page
    const buttons = canvas.getAllByRole("button");
    const nextButton = buttons[buttons.length - 1];
    await expect(nextButton).toHaveAttribute("aria-disabled", "true");
  },
};
