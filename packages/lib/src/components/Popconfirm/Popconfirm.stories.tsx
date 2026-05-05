import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
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
  render: () => (
    <div style={{ padding: '100px' }}>
      <Popconfirm
        onConfirm={() => {}}
        trigger={<Button>Delete Item</Button>}
      >
        Are you sure you want to proceed?
      </Popconfirm>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /delete item/i })).toBeVisible();
  },
};

export const OpenState: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: '100px' }}>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          onConfirm={() => setOpen(false)}
        >
          Are you sure you want to delete this item?
        </Popconfirm>
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

export const CustomConfirmText: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: '100px' }}>
        <Popconfirm
          confirmText="Delete"
          open={open}
          setOpen={setOpen}
          onConfirm={() => setOpen(false)}
        >
          This action cannot be undone.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      const tooltip = doc.body.querySelector('[role="tooltip"]');
      expect(tooltip).not.toBeNull();
      expect(tooltip!.textContent).toContain('Delete');
    });
  },
};
