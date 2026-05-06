import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { fn } from 'storybook/test';
import Popconfirm from './index';

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
  render: () => (
    <Popconfirm
      onConfirm={fn()}
      trigger={<button>Delete item</button>}
    >
      Are you sure you want to delete this item?
    </Popconfirm>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /delete item/i }),
    ).toBeVisible();
  },
};

export const CustomConfirmText: Story = {
  render: () => (
    <Popconfirm
      confirmText="Confirm"
      onConfirm={fn()}
      trigger={<button>Remove</button>}
    >
      This action cannot be undone.
    </Popconfirm>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /remove/i }),
    ).toBeVisible();
  },
};

export const Opened: Story = {
  render: () => (
    <div style={{ padding: '80px' }}>
      <Popconfirm
        onConfirm={fn()}
        open={true}
        setOpen={() => {}}
        trigger={<button>Action</button>}
      >
        Confirm this action?
      </Popconfirm>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      const allButtons = Array.from(doc.querySelectorAll('button'));
      const cancelBtn = allButtons.find((b) => b.textContent === 'Cancel');
      expect(cancelBtn).toBeTruthy();
    });
  },
};
