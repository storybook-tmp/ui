import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { Button } from '@leafygreen-ui/button';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    trigger: <Button>Delete Item</Button>,
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Are you sure you want to delete this item?',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /delete item/i }),
    ).toBeVisible();
  },
};

export const Opened: Story = {
  args: {
    children: 'Are you sure you want to remove this?',
    open: true,
    setOpen: () => {},
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      expect(doc.body.querySelector('[role="tooltip"]')).toBeInTheDocument();
    });
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: 'This action cannot be undone.',
    open: true,
    setOpen: () => {},
    confirmText: 'Confirm Delete',
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      const tooltip = doc.body.querySelector('[role="tooltip"]');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip?.textContent).toContain('Confirm Delete');
    });
  },
};
