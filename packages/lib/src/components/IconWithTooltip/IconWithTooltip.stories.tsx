import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import IconWithTooltip from './index';

const meta = {
  component: IconWithTooltip,
  tags: ['ai-generated'],
  args: {
    glyph: 'InfoWithCircle',
    children: 'This is tooltip content',
  },
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /info with circle/i })).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Warning: please review this item',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /warning/i })).toBeVisible();
  },
};

export const QuestionMarkIcon: Story = {
  args: {
    glyph: 'QuestionMarkWithCircle',
    children: 'Need help? Click here for more info.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /question mark with circle/i })).toBeVisible();
  },
};
