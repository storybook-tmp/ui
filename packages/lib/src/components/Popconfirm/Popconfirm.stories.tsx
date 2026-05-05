import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
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
          onConfirm={() => setOpen(false)}
          refEl={triggerRef}
        />
      </div>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /delete item/i })).toBeVisible();
  },
};

export const OpenState: Story = {
  args: {
    children: 'Are you sure you want to delete this item?',
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
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
          onConfirm={() => setOpen(false)}
          refEl={triggerRef}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      const doc = canvasElement.ownerDocument;
      const confirmBtn = doc.querySelector('[role="tooltip"]');
      expect(confirmBtn).not.toBeNull();
    });
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'This action cannot be undone.',
    confirmText: 'Confirm Reset',
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 100 }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Reset
        </Button>
        <Popconfirm
          {...args}
          open={open}
          setOpen={setOpen}
          onConfirm={() => setOpen(false)}
          refEl={triggerRef}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      const doc = canvasElement.ownerDocument;
      const confirmBtn = doc.querySelector('button');
      expect(confirmBtn).not.toBeNull();
    });
  },
};
