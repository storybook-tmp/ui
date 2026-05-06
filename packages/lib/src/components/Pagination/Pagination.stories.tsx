import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { fn } from 'storybook/test';
import Pagination from '.';

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
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 5')).toBeVisible();
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 2,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('3 / 5')).toBeVisible();
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
  },
};

export const NavigateNext: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const nextButton = canvas.getAllByRole('button')[1];
    await userEvent.click(nextButton);
    await expect(args.onChange).toHaveBeenCalledWith(1);
  },
};
