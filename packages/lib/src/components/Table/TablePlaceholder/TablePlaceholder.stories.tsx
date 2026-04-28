import preview from '#.storybook/preview';
import { expect } from 'storybook/test';
import { TablePlaceholder } from './index';

const meta = preview.meta({
  component: TablePlaceholder,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
});

export default meta;

export const Default = meta.story({
  args: {
    message: 'No results found.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No results found.')).toBeVisible();
  },
});

export const WithCustomGlyph = meta.story({
  args: {
    message: 'No tasks to display.',
    glyph: 'Warning',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No tasks to display.')).toBeVisible();
  },
});

export const Loading = meta.story({
  args: {
    message: 'Loading data...',
    glyph: 'Refresh',
    spin: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Loading data...')).toBeVisible();
  },
});
