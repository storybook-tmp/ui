import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Are you sure you want to delete?',
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div>
        <button ref={ref} onClick={() => setOpen(true)}>
          Delete item
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={ref}
          setOpen={setOpen}
        />
      </div>
    );
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'Proceed with action?',
    confirmText: 'Confirm',
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div>
        <button ref={ref} onClick={() => setOpen(true)}>
          Trigger
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={ref}
          setOpen={setOpen}
        />
      </div>
    );
  },
};
