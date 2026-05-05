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
        <button ref={ref} onClick={() => setOpen(true)} type="button">
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
    await userEvent.click(canvas.getByRole('button', { name: /delete item/i }));
    await expect(await canvas.findByText('Are you sure you want to delete this?')).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'Proceed with this action?',
    confirmText: 'Confirm',
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <>
        <button ref={ref} type="button">Trigger</button>
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

export const ConfirmDisabled: Story = {
  args: {
    children: 'You cannot confirm yet.',
    confirmDisabled: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <>
        <button ref={ref} type="button">Trigger</button>
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
