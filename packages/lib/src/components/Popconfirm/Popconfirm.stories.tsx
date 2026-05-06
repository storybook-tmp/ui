import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
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
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(body.getByText(/are you sure/i)).toBeVisible(),
    );
  },
};

export const WithCustomConfirmText: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 100 }}>
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
          Restart this task?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole('button', { name: /restart task/i });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(body.getByText(/restart this task/i)).toBeVisible(),
    );
  },
};

export const ConfirmDisabled: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 100 }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Action
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          confirmDisabled
          onConfirm={() => setOpen(false)}
        >
          Confirm is disabled.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /action/i }));
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(body.getByText(/confirm is disabled/i)).toBeVisible(),
    );
  },
};
