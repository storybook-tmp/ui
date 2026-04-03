import type { Meta, StoryObj } from '@storybook/react';
import IconWithTooltip from './index';

const meta = {
  title: 'AI Generated/Complex/IconWithTooltip',
  component: IconWithTooltip,
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoIcon: Story = {
  args: {
    glyph: 'InfoWithCircle',
    children: 'This is an informational tooltip',
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Warning: This action may have consequences',
  },
};

export const ErrorIcon: Story = {
  args: {
    glyph: 'X',
    children: 'An error occurred while processing your request',
  },
};
