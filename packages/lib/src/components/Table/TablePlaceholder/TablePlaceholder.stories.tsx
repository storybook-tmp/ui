import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TablePlaceholder } from '.';

const meta = {
  component: TablePlaceholder,
  tags: ['ai-generated'],
} satisfies Meta<typeof TablePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'No results found.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No results found.')).toBeVisible();
  },
};

export const WithCustomGlyph: Story = {
  args: {
    message: 'No tasks match the current filters.',
    glyph: 'Warning',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('No tasks match the current filters.'),
    ).toBeVisible();
  },
};

export const WithSpinner: Story = {
  args: {
    message: 'Loading data...',
    glyph: 'Refresh',
    spin: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Loading data...')).toBeVisible();
  },
};
