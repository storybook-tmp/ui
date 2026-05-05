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
          setOpen={setOpen}
          refEl={triggerRef}
        >
          Are you sure you want to delete this item?
        </Popconfirm>
      </>
    );
  },
  args: {
    children: 'Are you sure you want to delete this item?',
    onConfirm: () => {},
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /delete item/i }));
    // LeafyGreen Tooltip renders via a portal outside the story canvas
    const { within, waitFor } = await import('storybook/test');
    const screen = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      const el = screen.getByText('Are you sure you want to delete this item?');
      await expect(getComputedStyle(el).display).not.toBe('none');
    });
  },
};

export const CustomConfirmText: Story = {
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button ref={triggerRef}>Trigger</Button>
        <Popconfirm
          {...args}
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
        >
          Proceed with action?
        </Popconfirm>
      </>
    );
  },
  args: {
    confirmText: 'Confirm',
    children: 'Proceed with action?',
    onConfirm: () => {},
  },
};
