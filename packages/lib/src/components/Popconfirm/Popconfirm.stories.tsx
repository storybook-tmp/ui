import { useRef, useState } from 'react';
import { Button } from '@leafygreen-ui/button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Are you sure you want to delete this item?',
  },
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

const PopconfirmWithTrigger = (args: React.ComponentProps<typeof Popconfirm>) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        Delete Item
      </Button>
      <Popconfirm
        {...args}
        open={open}
        refEl={triggerRef}
        setOpen={setOpen}
      >
        Are you sure you want to delete this item?
      </Popconfirm>
    </>
  );
};

export const Default: Story = {
  render: (args) => <PopconfirmWithTrigger {...args} />,
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /delete item/i }));
    // Popconfirm content renders in a portal outside the canvas
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByText('Are you sure you want to delete this item?')).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  args: {
    confirmText: 'Confirm Delete',
  },
  render: (args) => <PopconfirmWithTrigger {...args} />,
};

export const ConfirmDisabled: Story = {
  args: {
    confirmDisabled: true,
  },
  render: (args) => <PopconfirmWithTrigger {...args} />,
};
