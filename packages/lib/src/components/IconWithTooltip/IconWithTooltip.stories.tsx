import preview from '#.storybook/preview';
import { expect, waitFor } from 'storybook/test';
import IconWithTooltip from './index';

const meta = preview.meta({
  component: IconWithTooltip,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
});

export default meta;

export const InfoIcon = meta.story({
  render: () => (
    <IconWithTooltip glyph="InfoWithCircle">
      This provides additional context about the field.
    </IconWithTooltip>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /info with circle/i })).toBeVisible();
  },
});

export const WarningIcon = meta.story({
  render: () => (
    <IconWithTooltip glyph="Warning">
      This action may have side effects.
    </IconWithTooltip>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /warning/i })).toBeVisible();
  },
});

export const HoverToReveal = meta.story({
  render: () => (
    <IconWithTooltip glyph="QuestionMarkWithCircle">
      Hover tooltip content is now visible.
    </IconWithTooltip>
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    const icon = canvas.getByRole('img', { name: /question mark with circle/i });
    await expect(icon).toBeVisible();
    await userEvent.hover(icon);
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      expect(doc.querySelector('[role="tooltip"]')).toBeTruthy();
    });
  },
});
