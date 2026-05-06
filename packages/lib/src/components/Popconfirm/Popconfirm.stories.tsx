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
    confirmText: 'Delete',
  },
  render: () => {
    const ref = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 100 }}>
        <Button ref={ref} onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={ref}
          onConfirm={() => setOpen(false)}
          confirmText="Delete"
        >
          Are you sure you want to delete this item?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /delete item/i }));
    // LG Tooltip renders content in a portal — query the document body
    const body = canvasElement.ownerDocument.body;
    const confirmText = await new Promise<HTMLElement>((resolve) => {
      const check = () => {
        const el = body.querySelector('[role="tooltip"]');
        if (el) return resolve(el as HTMLElement);
        setTimeout(check, 50);
      };
      check();
    });
    await expect(confirmText).toBeInTheDocument();
  },
};
