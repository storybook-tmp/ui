import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Are you sure?',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Are you sure you want to delete this?',
  },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <>
        <button ref={triggerRef} onClick={() => setOpen(true)}>
          Delete item
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        >
          {args.children}
        </Popconfirm>
      </>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /delete item/i })).toBeVisible();
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'Please confirm this action.',
    confirmText: 'Confirm',
  },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <>
        <button ref={triggerRef} onClick={() => setOpen(true)}>
          Trigger
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        >
          {args.children}
        </Popconfirm>
      </>
    );
  },
};

export const ConfirmDisabled: Story = {
  args: {
    children: 'Confirm button is disabled.',
    confirmDisabled: true,
  },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <>
        <button ref={triggerRef} onClick={() => setOpen(true)}>
          Trigger
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        >
          {args.children}
        </Popconfirm>
      </>
    );
  },
};
