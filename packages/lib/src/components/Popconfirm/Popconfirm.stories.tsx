import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from '.';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Are you sure you want to delete this item?',
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const triggerRef = useRef<HTMLElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 100 }}>
        <Button ref={triggerRef as React.RefObject<HTMLButtonElement>} onClick={() => setOpen(true)}>
          Delete item
        </Button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        >
          {args.children}
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvasElement, userEvent, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: /delete item/i }));
    // Popconfirm renders via portal outside the canvas; query the whole document
    const body = canvasElement.ownerDocument.body;
    const { within } = await import('storybook/test');
    const screen = within(body);
    await expect(await screen.findByText(/are you sure/i)).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'This action cannot be undone.',
    confirmText: 'Confirm Delete',
  },
  render: (args) => {
    const triggerRef = useRef<HTMLElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: 100 }}>
        <Button ref={triggerRef as React.RefObject<HTMLButtonElement>}>Remove</Button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        >
          {args.children}
        </Popconfirm>
      </div>
    );
  },
};
