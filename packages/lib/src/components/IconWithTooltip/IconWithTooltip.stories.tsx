import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
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
    children: 'This is a helpful tooltip message',
  },
  play: async ({ canvas }) => {
    // The icon should be rendered
    const icon = canvas.getByRole('img', { name: /info with circle icon/i });
    await expect(icon).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'This action cannot be undone',
  },
  play: async ({ canvas }) => {
    const icon = canvas.getByRole('img', { name: /warning icon/i });
    await expect(icon).toBeVisible();
  },
};

export const QuestionMarkIcon: Story = {
  args: {
    glyph: 'QuestionMarkWithCircle',
    children: 'Click here for more information about this field',
  },
  play: async ({ canvas }) => {
    const icon = canvas.getByRole('img', {
      name: /question mark with circle icon/i,
    });
    await expect(icon).toBeVisible();
  },
};
