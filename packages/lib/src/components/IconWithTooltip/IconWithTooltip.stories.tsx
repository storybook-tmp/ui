import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import IconWithTooltip from './index';

const meta = {
  component: IconWithTooltip,
  tags: ['ai-generated'],
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    glyph: 'InfoWithCircle',
    children: 'This is helpful tooltip text',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /info with circle/i })).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Warning: this action is irreversible',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /warning/i })).toBeVisible();
  },
};

export const HoverShowsTooltip: Story = {
  args: {
    glyph: 'QuestionMarkWithCircle',
    children: 'Need help? Check the documentation.',
  },
  play: async ({ canvas, userEvent }) => {
    const icon = canvas.getByRole('img', { name: /question mark with circle/i });
    await expect(icon).toBeVisible();
    await userEvent.hover(icon);
  },
};
