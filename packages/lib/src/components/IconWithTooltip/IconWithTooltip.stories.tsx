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
    children: 'This is helpful information',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /info with circle/i })).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Proceed with caution',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /warning/i })).toBeVisible();
  },
};

export const WithTooltipShown: Story = {
  args: {
    glyph: 'QuestionMarkWithCircle',
    children: 'Need help?',
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    const icon = canvas.getByRole('img', { name: /question mark with circle/i });
    await expect(icon).toBeVisible();
    await userEvent.hover(icon);
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      expect(doc.body.querySelector('[role="tooltip"]')).toBeInTheDocument();
    });
  },
};
