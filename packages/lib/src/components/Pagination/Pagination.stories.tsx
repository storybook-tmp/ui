import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from './index';

const meta = {
  title: 'AI Generated/Complex/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 10,
    onChange: () => {},
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
    totalResults: 100,
    pageSize: 10,
    onChange: () => {},
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 9,
    totalResults: 100,
    pageSize: 10,
    onChange: () => {},
  },
};
