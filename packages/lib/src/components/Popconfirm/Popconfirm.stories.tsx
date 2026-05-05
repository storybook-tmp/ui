import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Are you sure you want to proceed?',
  },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <>
        <button ref={triggerRef} onClick={() => setOpen(true)}>
          Open Popconfirm
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        />
      </>
    );
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /open popconfirm/i }));
    // Popconfirm uses LeafyGreen Tooltip which renders via portal
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByText('Are you sure you want to proceed?')).toBeInTheDocument();
    await expect(body.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'Delete this item?',
    confirmText: 'Delete',
  },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <>
        <button ref={triggerRef}>Trigger</button>
        <Popconfirm
          {...args}
          open={open}
          refEl={triggerRef}
          setOpen={setOpen}
        />
      </>
    );
  },
};
