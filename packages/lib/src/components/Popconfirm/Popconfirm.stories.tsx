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
          setOpen={setOpen}
          refEl={triggerRef}
        />
      </>
    );
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /delete item/i }));
    // Popconfirm renders in a portal/tooltip, query from document
    const doc = canvasElement.ownerDocument;
    await expect(doc.querySelector('[role="tooltip"]')).not.toBeNull();
  },
};

export const CustomConfirmText: Story = {
  args: {
    confirmText: 'Confirm Delete',
  },
};
