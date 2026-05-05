import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, waitFor } from 'storybook/test';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <button>Delete Item</button>,
    children: <span>Are you sure you want to delete this item?</span>,
    onConfirm: fn(),
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      expect(doc.querySelector('[role="tooltip"]')).not.toBeNull();
    });
  },
};

export const WithCustomConfirmText: Story = {
  args: {
    trigger: <button>Remove</button>,
    confirmText: 'Confirm Delete',
    children: <span>This action cannot be undone.</span>,
    onConfirm: fn(),
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole('button', { name: /remove/i });
    await userEvent.click(trigger);
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      expect(doc.querySelector('[role="tooltip"]')).not.toBeNull();
    });
  },
};

export const ConfirmDisabled: Story = {
  args: {
    trigger: <button>Action</button>,
    confirmDisabled: true,
    children: <span>Please fill in required fields first.</span>,
    onConfirm: fn(),
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole('button', { name: /action/i });
    await userEvent.click(trigger);
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      expect(doc.querySelector('[role="tooltip"]')).not.toBeNull();
    });
  },
};
