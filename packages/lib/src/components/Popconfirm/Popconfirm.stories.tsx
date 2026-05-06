import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, fn } from 'storybook/test';
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
    const body = within(canvasElement.ownerDocument.body);
    await expect(body.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    await expect(body.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
    await expect(body.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  },
};

export const CustomConfirmText: Story = {
  args: {
    confirmText: 'Delete',
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(body.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  },
};

export const ConfirmDisabled: Story = {
  args: {
    confirmDisabled: true,
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(body.getByRole('button', { name: 'Yes' })).toHaveAttribute('aria-disabled', 'true');
  },
};

export const ConfirmInteraction: Story = {
  play: async ({ canvasElement, userEvent, args }) => {
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(body.getByRole('button', { name: 'Yes' }));
    await expect(args.onConfirm).toHaveBeenCalled();
  },
};
