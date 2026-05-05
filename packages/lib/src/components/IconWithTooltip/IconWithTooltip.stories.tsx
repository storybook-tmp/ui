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
    children: 'This is a helpful tooltip message',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /info with circle icon/i })).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'This action may have consequences',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /warning icon/i })).toBeVisible();
  },
};

export const WithHover: Story = {
  args: {
    glyph: 'QuestionMarkWithCircle',
    children: 'Hover tooltip content',
  },
  play: async ({ canvas, userEvent }) => {
    const icon = canvas.getByRole('img', { name: /question mark with circle icon/i });
    await expect(icon).toBeVisible();
    await userEvent.hover(icon);
  },
};
