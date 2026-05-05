import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Pagination from "./index";

const meta = {
  component: Pagination,
  tags: ["ai-generated"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1 / 5")).toBeVisible();
    // prev button is disabled on first page
    const buttons = canvas.getAllByRole("button");
    await expect(buttons[0]).toHaveAttribute("aria-disabled", "true");
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 2,
    totalResults: 50,
    pageSize: 10,
    onChange: () => {},
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
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("5 / 5")).toBeVisible();
    // next button is disabled on last page
    const buttons = canvas.getAllByRole("button");
    await expect(buttons[1]).toHaveAttribute("aria-disabled", "true");
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 10,
    countLimit: 100,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1 / many")).toBeVisible();
  },
};
