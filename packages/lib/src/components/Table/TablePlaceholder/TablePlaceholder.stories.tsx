import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TablePlaceholder } from './index';

const meta = {
  component: TablePlaceholder,
  tags: ['ai-generated'],
  args: {
    message: 'No data to display',
  },
} satisfies Meta<typeof TablePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No data to display')).toBeVisible();
  },
};

export const CustomGlyph: Story = {
  args: {
    message: 'Loading results...',
    glyph: 'Refresh',
    spin: true,
  },
};

export const CustomMessage: Story = {
  args: {
    message: <em>Try adjusting your filters</em>,
  },
};
