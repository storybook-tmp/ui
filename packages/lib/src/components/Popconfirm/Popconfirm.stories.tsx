import { useRef, useState } from 'react';
import { Button } from '@leafygreen-ui/button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
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
          refEl={buttonRef}
          setOpen={setOpen}
        >
          Are you sure you want to delete this item?
        </Popconfirm>
      </>
    );
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /delete item/i }));
    const body = within(canvasElement.ownerDocument.body);
    await expect(
      await body.findByText('Are you sure you want to delete this item?'),
    ).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  args: { children: 'Proceed with action?' },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={buttonRef}>Trigger</Button>
        <Popconfirm
          {...args}
          confirmText="Absolutely"
          open={open}
          refEl={buttonRef}
          setOpen={setOpen}
        >
          Proceed with action?
        </Popconfirm>
      </>
    );
  },
};
