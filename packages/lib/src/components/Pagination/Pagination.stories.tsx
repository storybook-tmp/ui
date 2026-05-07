import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import Pagination from ".";

const meta = {
  component: Pagination,
  tags: ["ai-generated"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 0,
    pageSize: 10,
    totalResults: 95,
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("1 / 10")).toBeVisible();
    await expect(
      canvasElement.querySelector('[data-cy="prev-page-button"]'),
    ).toHaveAttribute("aria-disabled", "true");
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 9,
    pageSize: 10,
    totalResults: 95,
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("10 / 10")).toBeVisible();
    await expect(
      canvasElement.querySelector('[data-cy="next-page-button"]'),
    ).toHaveAttribute("aria-disabled", "true");
  },
};

export const CallbackPagination: Story = {
  args: {
    currentPage: 1,
    onChange: fn(),
    pageSize: 10,
    totalResults: 95,
  },
  play: async ({ args, canvasElement, userEvent }) => {
    const nextButton = canvasElement.querySelector(
      '[data-cy="next-page-button"]',
    );
    await expect(nextButton).toBeVisible();
    await userEvent.click(nextButton as HTMLElement);
    await expect(args.onChange).toHaveBeenCalledWith(2);
  },
};
