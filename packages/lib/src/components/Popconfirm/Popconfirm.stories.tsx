import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, waitFor } from 'storybook/test';
import { within } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'placeholder' },
  render: () => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 100 }}>
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
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText('Are you sure you want to delete this item?')).toBeVisible();
    });
  },
};

export const CustomConfirmText: Story = {
  args: { children: 'placeholder' },
  render: () => {
    const [open, setOpen] = useState(true);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 100 }}>
        <Button ref={triggerRef}>Trigger</Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          confirmText="Confirm Delete"
          onConfirm={fn()}
        >
          This action cannot be undone.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByRole('button', { name: /confirm delete/i })).toBeVisible();
    });
    await expect(body.getByRole('button', { name: /cancel/i })).toBeVisible();
  },
};

export const ConfirmDisabled: Story = {
  args: { children: 'placeholder' },
  render: () => {
    const [open, setOpen] = useState(true);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 100 }}>
        <Button ref={triggerRef}>Trigger</Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          confirmDisabled={true}
          onConfirm={fn()}
        >
          Cannot confirm yet.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByRole('button', { name: /yes/i })).toHaveAttribute('aria-disabled', 'true');
    });
  },
};
