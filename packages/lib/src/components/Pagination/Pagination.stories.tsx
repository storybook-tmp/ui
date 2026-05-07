import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
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
    totalResults: 35,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1 / 4")).toBeVisible();
    await expect(canvas.getAllByRole("button")[0]).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 1,
    pageSize: 10,
    totalResults: 35,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("2 / 4")).toBeVisible();
    await expect(canvas.getAllByRole("button")[0]).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await expect(canvas.getAllByRole("button")[1]).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );
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

const PaginationExample = () => {
  const [page, setPage] = useState(0);
  return (
    <Pagination
      currentPage={page}
      onChange={setPage}
      pageSize={10}
      totalResults={35}
    />
  );
};

export const NextPageInteraction: Story = {
  args: {
    currentPage: 0,
    pageSize: 10,
    totalResults: 35,
  },
  render: () => <PaginationExample />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("1 / 4")).toBeVisible();

    await userEvent.click(canvas.getAllByRole("button")[1]);

    await expect(canvas.getByText("2 / 4")).toBeVisible();
  },
};
