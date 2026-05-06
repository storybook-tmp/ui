import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Popconfirm from '.';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Are you sure you want to delete this?',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <>
        <button ref={ref} onClick={() => setOpen(true)}>
          Delete item
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={ref}
          setOpen={setOpen}
        />
      </>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await userEvent.click(trigger);
    await expect(await canvas.findByText('Are you sure you want to delete this?')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /yes/i })).toBeInTheDocument();
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
      <>
        <button ref={ref}>Trigger</button>
        <Popconfirm
          {...args}
          open={open}
          refEl={ref}
          setOpen={setOpen}
        />
      </>
    );
  },
};
