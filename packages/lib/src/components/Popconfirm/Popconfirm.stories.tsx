import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, waitFor } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from '.';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Placeholder',
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          onConfirm={fn()}
          refEl={buttonRef}
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
    await waitFor(() => {
      expect(canvas.getByText('Are you sure you want to delete this item?')).toBeVisible();
    });
    await expect(canvas.getByRole('button', { name: /yes/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /cancel/i })).toBeVisible();
  },
};

export const CustomConfirmText: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Confirm
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          confirmText="Restart"
          onConfirm={fn()}
          refEl={buttonRef}
        >
          Are you sure you want to restart this task?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /open confirm/i });
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(canvas.getByText('Are you sure you want to restart this task?')).toBeVisible();
    });
    await expect(canvas.getByRole('button', { name: /^restart$/i })).toBeVisible();
  },
};

export const ConfirmDisabled: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={buttonRef}>
          Action
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          confirmDisabled
          onConfirm={fn()}
          refEl={buttonRef}
        >
          Confirm button is disabled.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText('Confirm button is disabled.')).toBeVisible();
    });
    const yesButton = canvas.getByRole('button', { name: /yes/i });
    await expect(yesButton).toHaveAttribute('aria-disabled', 'true');
  },
};
