import { useRef, useState } from 'react';
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
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={ref} onClick={() => setOpen(true)}>
          Delete item
        </Button>
        <Popconfirm
          {...args}
          open={open}
          refEl={ref}
          setOpen={setOpen}
        />
      </>
    );
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /delete item/i }));
    // LeafyGreen Tooltip renders content in a portal outside the story canvas
    const body = canvasElement.ownerDocument.body;
    const { within, waitFor } = await import('storybook/test');
    const bodyCanvas = within(body);
    // Wait for the popconfirm content to appear and become visible
    await waitFor(async () => {
      const el = bodyCanvas.getByText(/are you sure/i);
      await expect(el).toBeVisible();
    }, { timeout: 3000 });
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'Proceed with action?',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={ref} onClick={() => setOpen(true)}>
          Trigger
        </Button>
        <Popconfirm
          {...args}
          confirmText="Confirm"
          open={open}
          refEl={ref}
          setOpen={setOpen}
        />
      </>
    );
  },
};
