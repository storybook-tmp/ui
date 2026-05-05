import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import IconWithTooltip from '.';

const meta = {
  component: IconWithTooltip,
  tags: ['ai-generated'],
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    glyph: 'InfoWithCircle',
    children: 'This is helpful information',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /info with circle/i })).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'This action cannot be undone',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /warning/i })).toBeVisible();
  },
};

export const QuestionMark: Story = {
  args: {
    glyph: 'QuestionMarkWithCircle',
    children: 'Click for help',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /question mark with circle/i })).toBeVisible();
  },
};
