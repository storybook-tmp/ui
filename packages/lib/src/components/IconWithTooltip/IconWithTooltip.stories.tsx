import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import IconWithTooltip from './index';

const meta = {
  component: IconWithTooltip,
  tags: ['ai-generated'],
  args: {
    glyph: 'InfoWithCircle',
    children: 'This is a helpful tooltip',
  },
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    // The icon should be visible
    await expect(canvas.getByRole('img', { name: /info with circle icon/i })).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Warning: something needs attention',
  },
};
