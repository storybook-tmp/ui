import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from './index';

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
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 100 }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Popconfirm
          {...args}
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      expect(doc.body.querySelector('[role="tooltip"]')).not.toBeNull();
    });
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'Are you sure you want to restart this task?',
    confirmText: 'Restart',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 100 }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Restart Task
        </Button>
        <Popconfirm
          {...args}
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole('button', { name: /restart task/i });
    await userEvent.click(trigger);
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      expect(doc.body.querySelector('[role="tooltip"]')).not.toBeNull();
    });
  },
};

export const ConfirmDisabled: Story = {
  args: {
    children: 'Confirm button is disabled',
    confirmDisabled: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 100 }}>
        <Button ref={triggerRef}>Action</Button>
        <Popconfirm
          {...args}
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          onConfirm={() => {}}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      expect(doc.body.querySelector('[role="tooltip"]')).not.toBeNull();
    });
  },
};
