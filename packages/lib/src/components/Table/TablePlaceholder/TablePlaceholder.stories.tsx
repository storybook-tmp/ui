import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TablePlaceholder } from './index';

const meta = {
  component: TablePlaceholder,
  tags: ['ai-generated'],
} satisfies Meta<typeof TablePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'No results found',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No results found')).toBeVisible();
  },
};

export const WithCustomGlyph: Story = {
  args: {
    message: 'Loading data...',
    glyph: 'Refresh',
    spin: true,
  },
};

export const LongMessage: Story = {
  args: {
    message: 'There are no tasks matching the current filters. Try adjusting your search criteria.',
  },
};
