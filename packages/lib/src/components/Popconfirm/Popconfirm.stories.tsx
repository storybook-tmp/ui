import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Are you sure you want to delete this item?' },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <button ref={triggerRef} onClick={() => setOpen(true)}>
          Delete item
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        >
          Are you sure you want to delete this item?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const { within, waitFor } = await import('storybook/test');
    const body = canvasElement.ownerDocument.body;
    const screen = within(body);
    // LeafyGreen Tooltip has an entrance animation — wait for content to become visible
    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to delete this item?')).toBeVisible();
    });
    await expect(screen.getByRole('button', { name: /yes/i })).toBeVisible();
    await expect(screen.getByRole('button', { name: /cancel/i })).toBeVisible();
  },
};

export const CustomConfirmText: Story = {
  args: { children: 'This action cannot be undone.' },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <button ref={triggerRef} onClick={() => setOpen(true)}>
          Remove
        </button>
        <Popconfirm
          {...args}
          confirmText="Confirm"
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        >
          This action cannot be undone.
        </Popconfirm>
      </div>
    );
  },
};
