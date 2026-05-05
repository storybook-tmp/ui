import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Popconfirm from './index';

const meta = {
  title: 'AI Generated/Complex/Popconfirm',
  component: Popconfirm,
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Are you sure you want to delete this item?',
    onConfirm: fn(),
    onClose: fn(),
  },
};

export const CustomText: Story = {
  args: {
    children: 'This action cannot be undone',
    confirmText: 'Delete Forever',
    onConfirm: fn(),
    onClose: fn(),
  },
};

export const DisabledConfirm: Story = {
  args: {
    children: 'Please accept the terms first',
    confirmDisabled: true,
    onConfirm: fn(),
    onClose: fn(),
  },
};

export const OpenState: Story = {
  args: {
    children: 'Confirm your action',
    open: true,
    setOpen: fn(),
    onConfirm: fn(),
    onClose: fn(),
  },
};
