import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from '.';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Are you sure?',
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Are you sure you want to delete this item?',
    trigger: <Button>Delete Item</Button>,
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(canvas.getByText('Are you sure you want to delete this item?')).toBeVisible();
    });
  },
};

export const WithCustomConfirmText: Story = {
  args: {
    children: 'This action cannot be undone.',
    confirmText: 'Confirm Delete',
    trigger: <Button>Remove</Button>,
  },
  play: async ({ canvasElement, canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /remove/i });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText('This action cannot be undone.')).toBeVisible();
    });
    await expect(body.getByText('Confirm Delete')).toBeVisible();
  },
};

export const ConfirmDisabled: Story = {
  args: {
    children: 'Cannot confirm right now.',
    confirmDisabled: true,
    trigger: <Button>Action</Button>,
  },
  play: async ({ canvasElement, canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /action/i });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText('Cannot confirm right now.')).toBeVisible();
    });
    const yesButton = body.getByText('Yes').closest('button') as HTMLElement;
    await expect(yesButton).toHaveAttribute('aria-disabled', 'true');
  },
};
