import type { Meta, StoryObj } from '@storybook/react-vite';
import IconWithTooltip from './index';

const meta = {
  title: 'AI Generated/Medium/IconWithTooltip',
  component: IconWithTooltip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    glyph: 'InfoWithCircle',
    children: 'This is a tooltip description',
  },
};

export const Warning: Story = {
  args: {
    glyph: 'Warning',
    children: 'Warning: something needs your attention',
  },
};
