import type { Meta, StoryObj } from '@storybook/react';
import IconWithTooltip from './index';

const meta = {
  title: 'AI Generated/Simple/IconWithTooltip',
  component: IconWithTooltip,
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInfoIcon: Story = {
  args: {
    glyph: 'InfoWithCircle',
    children: 'This is helpful information',
  },
};

export const WithWarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'This is a warning message',
  },
};
