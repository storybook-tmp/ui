import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { within } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Confirm action?',
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={ref} onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Popconfirm
          open={open}
          refEl={ref}
          setOpen={setOpen}
        >
          Are you sure you want to delete this item?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText('Are you sure you want to delete this item?')).toBeVisible();
    });
  },
};

export const WithCustomConfirmText: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={ref} onClick={() => setOpen(true)}>
          Reset Settings
        </Button>
        <Popconfirm
          confirmText="Confirm Reset"
          open={open}
          refEl={ref}
          setOpen={setOpen}
        >
          This will reset all settings to their defaults.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /reset settings/i });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByRole('button', { name: /confirm reset/i })).toBeVisible();
    });
    await expect(body.getByRole('button', { name: /cancel/i })).toBeVisible();
  },
};

export const CancelAction: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: '100px' }}>
        <Button ref={ref} onClick={() => setOpen(true)}>
          Trigger
        </Button>
        <Popconfirm
          open={open}
          refEl={ref}
          setOpen={setOpen}
        >
          Do you want to proceed?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText('Do you want to proceed?')).toBeVisible();
    });
    await expect(body.getByRole('button', { name: /cancel/i })).toBeVisible();
  },
};
