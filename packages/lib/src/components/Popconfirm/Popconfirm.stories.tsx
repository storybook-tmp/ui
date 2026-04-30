import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Are you sure you want to delete this item?',
    onConfirm: fn(),
    onClose: fn(),
    // Use a span trigger to avoid nested <button> inside Tooltip's wrapper
    trigger: <span>Delete</span>,
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Delete')).toBeVisible();
  },
};

export const ClickToOpen: Story = {};

export const CustomConfirmText: Story = {
  args: {
    confirmText: 'Confirm delete',
    children: 'This action cannot be undone.',
  },
};

export const ConfirmDisabled: Story = {
  args: {
    confirmDisabled: true,
  },
};
