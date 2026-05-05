import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from '.';

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
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={triggerRef}>Delete item</Button>
        <Popconfirm
          {...args}
          open
          refEl={triggerRef}
          setOpen={() => {}}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    await expect(button).toBeVisible();
  },
};

export const WithCustomConfirmText: Story = {
  args: {
    children: 'Are you sure you want to restart this task?',
    confirmText: 'Restart',
  },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={triggerRef}>Restart task</Button>
        <Popconfirm
          {...args}
          open
          refEl={triggerRef}
          setOpen={() => {}}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    await expect(button).toBeVisible();
    await expect(button).toHaveTextContent('Restart task');
  },
};

export const Closed: Story = {
  args: {
    children: 'Are you sure you want to abort this build?',
  },
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={triggerRef}>Abort build</Button>
        <Popconfirm
          {...args}
          open={false}
          refEl={triggerRef}
          setOpen={() => {}}
        />
      </div>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /abort build/i })).toBeVisible();
  },
};
