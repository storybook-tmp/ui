import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Popconfirm from './index';
import { Button } from '@leafygreen-ui/button';

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
    children: 'Are you sure you want to delete?',
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={ref} onClick={() => setOpen(true)}>
          Delete
        </Button>
        <Popconfirm
          {...args}
          open={open}
          setOpen={setOpen}
          refEl={ref as unknown as React.RefObject<HTMLElement>}
        >
          {args.children}
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const body = canvasElement.ownerDocument.body;
    const { within } = await import('storybook/test');
    const screen = within(body);
    await expect(await screen.findByRole('button', { name: /yes/i })).toBeInTheDocument();
    await expect(await screen.findByRole('button', { name: /cancel/i })).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'Proceed with action?',
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={ref} onClick={() => setOpen(true)}>
          Trigger
        </Button>
        <Popconfirm
          {...args}
          confirmText="Confirm"
          open={open}
          setOpen={setOpen}
          refEl={ref as unknown as React.RefObject<HTMLElement>}
        >
          {args.children}
        </Popconfirm>
      </div>
    );
  },
};
