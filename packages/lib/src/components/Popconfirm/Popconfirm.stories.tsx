import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ padding: 100 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Are you sure you want to proceed?' as unknown as React.ReactNode,
  },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <>
        <button ref={triggerRef} onClick={() => setOpen(true)}>
          Open Popconfirm
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        />
      </>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /open popconfirm/i })).toBeVisible();
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'This action cannot be undone.' as unknown as React.ReactNode,
    confirmText: 'Delete',
  },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <>
        <button ref={triggerRef} onClick={() => setOpen(true)}>
          Delete Item
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        />
      </>
    );
  },
};
