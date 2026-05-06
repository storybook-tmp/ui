import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TablePlaceholder } from '.';

const meta = {
  component: TablePlaceholder,
  tags: ['ai-generated'],
  args: {
    message: 'No results found',
  },
} satisfies Meta<typeof TablePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No results found')).toBeVisible();
  },
};

export const Loading: Story = {
  args: {
    message: 'Loading data...',
    spin: true,
  },
};

export const CustomGlyph: Story = {
  args: {
    message: 'Something went wrong',
    glyph: 'Warning',
  },
};
