import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import Pagination from ".";

const meta = {
  component: Pagination,
  tags: ["ai-generated"],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 0,
    pageSize: 10,
    totalResults: 42,
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText("1 / 5")).toBeInTheDocument();
    await userEvent.click(canvas.getAllByRole("button")[1]);
    await expect(args.onChange).toHaveBeenCalledWith(1);
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
    pageSize: 10,
    totalResults: 42,
  },
};

export const CountLimit: Story = {
  args: {
    countLimit: 100,
    currentPage: 0,
    pageSize: 10,
    totalResults: 100,
  },
};
