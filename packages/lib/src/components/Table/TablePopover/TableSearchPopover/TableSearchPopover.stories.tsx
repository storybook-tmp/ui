import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, waitFor, within } from 'storybook/test';
import TableSearchPopover from './index';

const meta = {
  component: TableSearchPopover,
  tags: ['ai-generated'],
} satisfies Meta<typeof TableSearchPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onConfirm: fn(),
    value: '',
    placeholder: 'Search...',
    'data-cy': 'search-popover',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Table Search Popover Icon')).toBeVisible();
  },
};

export const OpenPopover: Story = {
  args: {
    onConfirm: fn(),
    value: '',
    placeholder: 'Type to search...',
    'data-cy': 'search-popover',
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const iconButton = canvas.getByLabelText('Table Search Popover Icon');
    await userEvent.click(iconButton);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText('Press enter to filter.')).toBeVisible();
    });
  },
};

export const WithExistingValue: Story = {
  args: {
    onConfirm: fn(),
    value: 'existing search',
    placeholder: 'Search...',
    'data-cy': 'search-popover',
  },
  play: async ({ canvas }) => {
    // When there's an existing value, the icon should be highlighted (blue)
    await expect(canvas.getByLabelText('Table Search Popover Icon')).toBeVisible();
  },
};
