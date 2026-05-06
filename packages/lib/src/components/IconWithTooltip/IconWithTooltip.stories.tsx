import type { Meta, StoryObj } from '@storybook/react-vite';
import IconWithTooltip from './index';

const meta = {
  component: IconWithTooltip,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ padding: 80 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    glyph: 'InfoWithCircle',
    children: 'This is additional information',
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Something needs attention',
  },
};
