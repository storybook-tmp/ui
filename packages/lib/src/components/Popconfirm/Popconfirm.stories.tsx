import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from '.';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Confirm action?',
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 80 }}>
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
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await expect(trigger).toBeVisible();
  },
};

export const TriggerOpen: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 80 }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Restart Task
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          confirmText="Restart"
          onConfirm={() => setOpen(false)}
        >
          Are you sure you want to restart this task?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /restart task/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    await expect(trigger).toBeVisible();
  },
};

export const ConfirmDisabled: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 80 }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Open Confirmation
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          confirmDisabled
          onConfirm={() => {}}
        >
          Confirm is disabled here.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /open confirmation/i });
    await expect(trigger).toBeVisible();
  },
};
