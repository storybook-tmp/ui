import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Pagination from ".";

const meta = {
  title: "AI Generated/Medium/Pagination",
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 10,
    onChange: fn(),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
    totalResults: 100,
    pageSize: 10,
    onChange: fn(),
  },
};
