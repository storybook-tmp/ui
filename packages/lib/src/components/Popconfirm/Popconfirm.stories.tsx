import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { within } from 'storybook/test';
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
    trigger: <Button>Delete</Button>,
  },
  render: (args) => (
    <Popconfirm {...args} />
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole('button', { name: /delete/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText('Are you sure you want to delete this item?')).toBeVisible();
    });
  },
};

export const WithCustomConfirmText: Story = {
  args: {
    children: 'This action cannot be undone.',
    confirmText: 'Confirm',
    trigger: <Button>Remove</Button>,
  },
  render: (args) => (
    <Popconfirm {...args} />
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole('button', { name: /remove/i });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText('This action cannot be undone.')).toBeVisible();
    });
    // Find the Confirm button inside the tooltip content, not the trigger
    const confirmButtons = body.getAllByRole('button', { name: /confirm/i });
    await expect(confirmButtons.length).toBeGreaterThanOrEqual(1);
  },
};

export const ConfirmDisabled: Story = {
  args: {
    children: 'Confirm button is disabled.',
    confirmDisabled: true,
    trigger: <Button>Action</Button>,
  },
  render: (args) => (
    <Popconfirm {...args} />
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole('button', { name: /action/i });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText('Confirm button is disabled.')).toBeVisible();
    });
    // Find the Yes buttons (may include portal duplicates) and verify at least one is disabled
    const yesButtons = body.getAllByRole('button', { name: /yes/i });
    const disabledButton = yesButtons.find(
      (btn) => btn.getAttribute('aria-disabled') === 'true',
    );
    await expect(disabledButton).toBeDefined();
  },
};
