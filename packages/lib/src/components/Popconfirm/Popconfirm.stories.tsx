import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
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
  args: { children: 'Are you sure you want to delete this?' },
  render: () => (
    <Popconfirm
      trigger={<Button>Delete Item</Button>}
    >
      <span>Are you sure you want to delete this?</span>
    </Popconfirm>
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await expect(trigger).toBeVisible();
  },
};

export const WithCustomConfirmText: Story = {
  args: { children: 'This action cannot be undone.' },
  render: () => (
    <Popconfirm
      trigger={<Button>Remove</Button>}
      confirmText="Delete"
    >
      <span>This action cannot be undone.</span>
    </Popconfirm>
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /remove/i });
    await expect(trigger).toBeVisible();
  },
};

export const ConfirmDisabled: Story = {
  args: { children: 'Waiting for validation...' },
  render: () => (
    <Popconfirm
      trigger={<Button>Submit</Button>}
      confirmDisabled
      confirmText="Confirm"
    >
      <span>Waiting for validation...</span>
    </Popconfirm>
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /submit/i });
    await expect(trigger).toBeVisible();
  },
};
