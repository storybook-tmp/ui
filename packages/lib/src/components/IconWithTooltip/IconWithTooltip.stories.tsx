import type { Meta, StoryObj } from '@storybook/react-vite';
import IconWithTooltip from '.';

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

export const Default: Story = {};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Warning: something needs attention',
  },
};
