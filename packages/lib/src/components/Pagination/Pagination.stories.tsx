import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Pagination from ".";

const meta = {
  component: Pagination,
  args: {
    currentPage: 0,
    pageSize: 10,
    totalResults: 25,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  render: (args) => <StatefulPagination {...args} />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const nextButton = canvasElement.querySelector(
      '[data-cy="next-page-button"]',
    );

    await expect(canvas.getByText("1 / 3")).toBeVisible();
    await userEvent.click(nextButton as Element);

    await expect(canvas.getByText("2 / 3")).toBeVisible();
  },
};

export const LastPage: Story = {
  render: (args) => <StatefulPagination {...args} initialPage={2} />,
  play: async ({ canvas, canvasElement }) => {
    const nextButton = canvasElement.querySelector(
      '[data-cy="next-page-button"]',
    );

    await expect(canvas.getByText("3 / 3")).toBeVisible();
    await expect(nextButton).toHaveAttribute("aria-disabled", "true");
  },
};

export const CountLimit: Story = {
  args: {
    countLimit: 100,
    currentPage: 0,
    pageSize: 10,
    totalResults: 100,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1 / many")).toBeVisible();
  },
};

const StatefulPagination = ({
  initialPage,
  ...args
}: React.ComponentProps<typeof Pagination> & { initialPage?: number }) => {
  const [page, setPage] = useState(initialPage ?? args.currentPage);

  return <Pagination {...args} currentPage={page} onChange={setPage} />;
};
