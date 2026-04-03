import type { Meta, StoryObj } from "@storybook/react-vite";
import Pagination from ".";

const meta = {
  component: Pagination,
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Pagination currentPage={0} totalResults={100} pageSize={10} />
  ),
};

export const MiddlePage: Story = {
  render: () => (
    <Pagination currentPage={4} totalResults={100} pageSize={10} />
  ),
};

export const LastPage: Story = {
  render: () => (
    <Pagination currentPage={9} totalResults={100} pageSize={10} />
  ),
};

export const WithCountLimit: Story = {
  render: () => (
    <Pagination
      currentPage={0}
      totalResults={5000}
      pageSize={10}
      countLimit={5000}
    />
  ),
};

export const SinglePage: Story = {
  render: () => (
    <Pagination currentPage={0} totalResults={5} pageSize={10} />
  ),
};
