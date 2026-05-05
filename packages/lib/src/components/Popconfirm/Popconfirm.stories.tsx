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
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Delete item
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
    await userEvent.click(canvas.getByRole('button', { name: /delete item/i }));
    // LeafyGreen tooltips render in the document body
    const body = canvasElement.ownerDocument.body;
    await expect(body.querySelector('[role="tooltip"]')).not.toBeNull();
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'Confirm your submission?',
    confirmText: 'Confirm',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Submit
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
