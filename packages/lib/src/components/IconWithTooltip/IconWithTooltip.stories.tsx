import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const icon = canvas.getByRole('img', { name: /info with circle/i });
    await expect(icon).toBeVisible();
    await userEvent.hover(icon);
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Something may be wrong',
  },
};

export const WithDataCy: Story = {
  args: {
    'data-cy': 'my-icon-tooltip',
    glyph: 'QuestionMarkWithCircle',
    children: 'Need help?',
  },
};
