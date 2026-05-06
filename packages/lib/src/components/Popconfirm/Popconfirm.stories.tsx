import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        />
      </>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /delete item/i }));
    await expect(await canvas.findByText(/are you sure/i)).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'Remove this task?',
    confirmText: 'Remove',
  },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Remove
        </Button>
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
