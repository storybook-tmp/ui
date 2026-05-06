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

export const Spinning: Story = {
  args: {
    message: 'Loading data...',
    spin: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Loading data...')).toBeVisible();
  },
};

export const CustomGlyph: Story = {
  args: {
    message: 'Nothing to display',
    glyph: 'Warning',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Nothing to display')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    message: 'Submit',
  },
  play: async ({ canvas }) => {
    const wrapper = canvas.getByText('Submit').parentElement!;
    // TablePlaceholder uses opacity: 50% — fails if Emotion CSS did not load.
    await expect(getComputedStyle(wrapper).opacity).toBe('0.5');
  },
};
