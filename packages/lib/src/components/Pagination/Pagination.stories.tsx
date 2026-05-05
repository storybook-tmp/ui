import type { Meta, StoryObj } from "@storybook/react-vite";
import Pagination from ".";

const meta = {
  title: "AI Generated/Medium/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    reactRouter: {
      route: "/",
    },
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
};

export const CountLimited: Story = {
  args: {
    countLimit: 100,
    currentPage: 0,
    pageSize: 10,
    totalResults: 100,
  },
};
