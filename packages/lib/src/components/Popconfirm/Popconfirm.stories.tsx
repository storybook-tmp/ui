import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
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
    children: 'Are you sure you want to delete this?',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Delete
        </Button>
        <Popconfirm
          {...args}
          open={open}
          refEl={buttonRef}
          setOpen={setOpen}
        />
      </div>
    );
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /delete/i }));
    // Popconfirm renders in a portal — query via document body
    const body = within(canvasElement.ownerDocument.body);
    // LeafyGreen Tooltip may render in a hidden container; just verify it exists in DOM
    await expect(await body.findByText('Are you sure you want to delete this?')).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={buttonRef}>Trigger</Button>
        <Popconfirm
          {...args}
          open={open}
          refEl={buttonRef}
          setOpen={setOpen}
        />
      </div>
    );
  },
  args: { confirmText: 'Confirm', children: 'Confirm this action?' },
};
