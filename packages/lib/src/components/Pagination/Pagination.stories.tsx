import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import Pagination from './index';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
    onChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await expect(canvas.getByText('1 / 5')).toBeVisible();
    const nextBtn = canvas.getAllByRole('button')[1];
    await userEvent.click(nextBtn);
    await expect(args.onChange).toHaveBeenCalledWith(1);
  },
};

export const MiddlePage: Story = {
  args: { currentPage: 2 },
};

export const LastPage: Story = {
  args: { currentPage: 4 },
};

export const WithCountLimit: Story = {
  args: { countLimit: 50, totalResults: 100 },
};

export const NoResults: Story = {
  args: { totalResults: 0, currentPage: 0 },
};
