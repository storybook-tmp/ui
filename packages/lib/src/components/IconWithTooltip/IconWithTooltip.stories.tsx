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
    children: 'This is a helpful tooltip message',
  },
  play: async ({ canvas }) => {
    const icon = canvas.getByRole('img', { name: /info with circle/i });
    await expect(icon).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Warning: This action cannot be undone',
  },
  play: async ({ canvas }) => {
    const icon = canvas.getByRole('img', { name: /warning/i });
    await expect(icon).toBeVisible();
  },
};

export const QuestionIcon: Story = {
  args: {
    glyph: 'QuestionMarkWithCircle',
    children: 'Need help? Click here for more information.',
  },
  play: async ({ canvas }) => {
    const icon = canvas.getByRole('img', { name: /question mark with circle/i });
    await expect(icon).toBeVisible();
  },
};
