import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from './index';

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
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: '80px' }}>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={buttonRef}
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
      expect(doc.body.querySelector('[role="tooltip"]')).toBeInTheDocument();
    });
  },
};

export const WithCustomConfirmText: Story = {
  render: () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: '80px' }}>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Restart Task
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={buttonRef}
          confirmText="Restart"
          onConfirm={() => setOpen(false)}
        >
          Are you sure you want to restart this task?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      const tooltip = doc.body.querySelector('[role="tooltip"]');
      expect(tooltip).toBeInTheDocument();
    });
  },
};

export const ConfirmDisabled: Story = {
  render: () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: '80px' }}>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Action
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={buttonRef}
          confirmDisabled
          onConfirm={() => {}}
        >
          This action cannot be confirmed yet.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      const tooltip = doc.body.querySelector('[role="tooltip"]');
      expect(tooltip).toBeInTheDocument();
    });
  },
};
