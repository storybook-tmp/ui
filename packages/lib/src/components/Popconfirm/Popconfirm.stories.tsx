import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Confirmation content',
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          onConfirm={() => setOpen(false)}
        >
          Are you sure you want to delete this item?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    await waitFor(() => expect(canvas.getByText('Are you sure you want to delete this item?')).toBeVisible());
  },
};

export const WithCustomConfirmText: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={triggerRef}>Trigger</Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          confirmText="Confirm Delete"
          onConfirm={() => setOpen(false)}
        >
          This action cannot be undone.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByRole('button', { name: /confirm delete/i })).toBeVisible());
    await expect(canvas.getByRole('button', { name: /cancel/i })).toBeVisible();
  },
};

export const ConfirmDisabled: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={triggerRef}>Trigger</Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          confirmDisabled
          onConfirm={() => {}}
        >
          Cannot confirm yet.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText('Cannot confirm yet.')).toBeVisible());
    const yesButton = canvas.getByRole('button', { name: /yes/i });
    await expect(yesButton).toHaveAttribute('aria-disabled', 'true');
  },
};
