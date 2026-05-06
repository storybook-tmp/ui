import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Are you sure you want to proceed?',
    onConfirm: fn(),
    trigger: <button>Open Popconfirm</button>,
    open: true,
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomConfirmText: Story = {
  args: {
    confirmText: 'Confirm',
  },
};

export const ConfirmDisabled: Story = {
  args: {
    confirmDisabled: true,
  },
};
