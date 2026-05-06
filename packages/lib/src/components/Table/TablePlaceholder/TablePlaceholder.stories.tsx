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
    message: 'No data to display',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No data to display')).toBeVisible();
  },
};

export const Loading: Story = {
  args: {
    message: 'Loading results...',
    spin: true,
  },
};

export const CustomGlyph: Story = {
  args: {
    message: 'Something went wrong',
    glyph: 'Warning',
  },
};
