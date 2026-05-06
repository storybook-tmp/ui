import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { fn } from 'storybook/test';
import Pagination from './index';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 5')).toBeVisible();
    // LeafyGreen Button uses aria-disabled instead of the disabled attribute
    const prevButton = canvas.getAllByRole('button')[0];
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 2,
    totalResults: 50,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('3 / 5')).toBeVisible();
    // Both prev and next should be enabled
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[0]).not.toBeDisabled();
    await expect(buttons[1]).not.toBeDisabled();
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
    totalResults: 50,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('5 / 5')).toBeVisible();
    // LeafyGreen Button uses aria-disabled instead of the disabled attribute
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[buttons.length - 1]).toHaveAttribute('aria-disabled', 'true');
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    totalResults: 1000,
    pageSize: 10,
    countLimit: 1000,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / many')).toBeVisible();
  },
};

export const ClickNext: Story = {
  args: {
    currentPage: 0,
    totalResults: 30,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const buttons = canvas.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    await userEvent.click(nextButton);
    await expect(args.onChange).toHaveBeenCalledWith(1);
  },
};
