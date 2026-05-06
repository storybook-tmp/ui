import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, waitFor } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Confirm?',
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Delete item
        </Button>
        <Popconfirm
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
          onConfirm={fn()}
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
    await expect(canvas.getByRole('button', { name: /cancel/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /yes/i })).toBeVisible();
  },
};

export const WithCustomConfirmText: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Restart task
        </Button>
        <Popconfirm
          confirmText="Restart"
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
          onConfirm={fn()}
        >
          Are you sure you want to restart this task?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /restart task/i });
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /restart$/i })).toBeVisible();
    });
  },
};

export const ConfirmDisabled: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Submit
        </Button>
        <Popconfirm
          confirmDisabled
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
          onConfirm={fn()}
        >
          Confirm action?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(canvas.getByText('Confirm action?')).toBeVisible();
    });
    const yesButton = canvas.getByRole('button', { name: /yes/i });
    await expect(yesButton).toHaveAttribute('aria-disabled', 'true');
  },
};
