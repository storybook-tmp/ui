import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: <div>Placeholder</div>,
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  render: () => (
    <Popconfirm
      onConfirm={fn()}
      trigger={<button type="button">Delete</button>}
    >
      <div>Are you sure you want to delete this item?</div>
    </Popconfirm>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /delete/i })).toBeVisible();
  },
};

export const Opened: Story = {
  render: () => (
    <Popconfirm
      open
      setOpen={fn()}
      onConfirm={fn()}
      trigger={<button type="button">Action</button>}
    >
      <div>Confirm this action?</div>
    </Popconfirm>
  ),
  play: async ({ canvas }) => {
    // Tooltip content is in the document but may use portals
    await expect(canvas.getByText('Confirm this action?')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  render: () => (
    <Popconfirm
      confirmText="Deploy"
      open
      setOpen={fn()}
      onConfirm={fn()}
      trigger={<button type="button">Trigger</button>}
    >
      <div>Deploy to production?</div>
    </Popconfirm>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Deploy to production?')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Deploy' })).toBeInTheDocument();
  },
};

export const ConfirmDisabled: Story = {
  render: () => (
    <Popconfirm
      confirmDisabled
      open
      setOpen={fn()}
      onConfirm={fn()}
      trigger={<button type="button">Restricted</button>}
    >
      <div>This action is restricted</div>
    </Popconfirm>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Yes' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  },
};
