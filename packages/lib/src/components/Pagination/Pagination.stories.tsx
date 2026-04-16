import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect } from "storybook/test";
import Pagination from ".";

const meta = {
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 0,
    onChange: fn(),
    pageSize: 5,
    totalResults: 10,
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText("1 / 2")).toBeVisible();
    await expect(canvas.getByLabelText("Chevron Left Icon").closest("button")).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(canvas.getByLabelText("Chevron Right Icon").closest("button")!);
    await expect(args.onChange).toHaveBeenCalledWith(1);
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 1,
    onChange: fn(),
    pageSize: 5,
    totalResults: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("2 / 2")).toBeVisible();
    await expect(
      canvas.getByLabelText("Chevron Right Icon").closest("button"),
    ).toHaveAttribute("aria-disabled", "true");
  },
};

export const CountLimit: Story = {
  args: {
    countLimit: 100,
    currentPage: 0,
    onChange: fn(),
    pageSize: 10,
    totalResults: 100,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1 / many")).toBeVisible();
  },
};
