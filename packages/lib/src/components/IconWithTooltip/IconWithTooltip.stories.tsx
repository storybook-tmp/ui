import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import IconWithTooltip from './index';

const meta = {
  component: IconWithTooltip,
  tags: ['ai-generated'],
  args: {
    glyph: 'InfoWithCircle',
    children: 'This is an informational tooltip.',
  },
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img')).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Warning: something went wrong.',
  },
};

export const WithCustomDataCy: Story = {
  args: {
    'data-cy': 'my-tooltip-icon',
    glyph: 'Bell',
    children: 'Notification tooltip',
  },
};
