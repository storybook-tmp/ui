import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
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
    children: 'Are you sure you want to delete this item?',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Popconfirm
          {...args}
          open={open}
          setOpen={setOpen}
          refEl={buttonRef}
        />
      </>
    );
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await userEvent.click(trigger);
    // Popconfirm renders inside a LeafyGreen Tooltip which may use portals
    const body = within(canvasElement.ownerDocument.body);
    const confirmBtn = await body.findByRole('button', { name: /yes/i });
    await expect(confirmBtn).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'Proceed with this action?',
    confirmText: 'Confirm',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Trigger
        </Button>
        <Popconfirm
          {...args}
          open={open}
          setOpen={setOpen}
          refEl={buttonRef}
        />
      </>
    );
  },
};
