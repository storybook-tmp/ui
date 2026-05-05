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
    children: 'Are you sure you want to delete this item?',
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <>
        <button ref={ref} onClick={() => setOpen(true)}>
          Delete item
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={ref}
          setOpen={setOpen}
        />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    // LeafyGreen Tooltip renders into a portal outside the canvas, query the document body
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByRole('button', { name: /yes/i })).toBeInTheDocument();
    await expect(body.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'Proceed with this action?',
    confirmText: 'Confirm',
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <>
        <button ref={ref} onClick={() => setOpen(true)}>
          Trigger
        </button>
        <Popconfirm
          {...args}
          open={open}
          refEl={ref}
          setOpen={setOpen}
        />
      </>
    );
  },
};
