import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { fn } from 'storybook/test';
import Popconfirm from '.';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: <div>Are you sure you want to proceed?</div>,
    open: true,
    setOpen: fn(),
    onConfirm: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Popconfirm renders inside a LeafyGreen Tooltip portal which animates in
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByRole('button', { name: 'Yes' })).toBeInTheDocument();
    await expect(await body.findByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  args: {
    confirmText: 'Delete',
  },
};

export const ConfirmDisabled: Story = {
  args: {
    confirmDisabled: true,
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(
      body.getByRole('button', { name: 'Yes' }),
    ).toHaveAttribute('aria-disabled', 'true');
  },
};
