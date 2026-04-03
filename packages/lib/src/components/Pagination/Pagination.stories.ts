import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Pagination from './index';

const meta = {
  title: 'AI Generated/Medium/Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 0,
    pageSize: 10,
    totalResults: 100,
    onChange: fn(),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
    pageSize: 10,
    totalResults: 100,
    onChange: fn(),
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    pageSize: 10,
    totalResults: 1000,
    countLimit: 500,
    onChange: fn(),
  },
};
