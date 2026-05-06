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

export const CustomGlyph: Story = {
  args: {
    message: 'Still loading data...',
    glyph: 'Refresh',
    spin: true,
  },
};

export const WithReactNodeMessage: Story = {
  args: {
    message: <span>Try adjusting your <strong>filters</strong></span>,
  },
};
