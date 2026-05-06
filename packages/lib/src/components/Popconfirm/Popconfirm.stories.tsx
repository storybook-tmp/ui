import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, fn } from 'storybook/test';
import { within } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    onConfirm: fn(),
    children: 'Are you sure you want to delete this item?',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button>Delete</Button>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /delete/i })).toBeVisible();
  },
};

export const ClickToOpen: Story = {
  args: {
    trigger: <Button>Delete</Button>,
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /delete/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    // Popover content renders in a portal, query from the document
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(body.getByText('Are you sure you want to delete this item?')).toBeVisible(),
    );
  },
};

export const WithCustomConfirmText: Story = {
  args: {
    confirmText: 'Proceed',
    trigger: <Button>Action</Button>,
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /action/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    // Popover content renders in a portal, query from the document
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(body.getByText('Proceed')).toBeVisible(),
    );
  },
};
