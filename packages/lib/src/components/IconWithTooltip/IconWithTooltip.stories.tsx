import type { Meta, StoryObj } from '@storybook/react-vite';
import IconWithTooltip from './index';

const meta = {
  component: IconWithTooltip,
  tags: ['ai-generated'],
  args: {
    glyph: 'InfoWithCircle',
    children: 'This is helpful information',
  },
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Warning: this action is irreversible',
  },
};
