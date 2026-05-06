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
  args: { children: 'Are you sure you want to delete this item?' },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Delete item
        </Button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        >
          Are you sure you want to delete this item?
        </Popconfirm>
      </>
    );
  },
  play: async ({ canvas }) => {
    // Verify the trigger button renders and is interactive
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await expect(trigger).toBeEnabled();
    await expect(trigger).toHaveAttribute('aria-disabled', 'false');
  },
};

export const CustomConfirmText: Story = {
  args: { children: 'Proceed with this action?' },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button ref={triggerRef}>Trigger</Button>
        <Popconfirm
          {...args}
          confirmText="Confirm"
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        >
          Proceed with this action?
        </Popconfirm>
      </>
    );
  },
};

export const ConfirmDisabled: Story = {
  args: { children: 'Cannot confirm yet.' },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button ref={triggerRef}>Trigger</Button>
        <Popconfirm
          {...args}
          confirmDisabled
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        >
          Cannot confirm yet.
        </Popconfirm>
      </>
    );
  },
};
