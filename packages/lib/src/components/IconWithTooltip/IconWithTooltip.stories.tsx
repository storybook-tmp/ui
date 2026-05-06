import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import IconWithTooltip from '.';

const meta = {
  component: IconWithTooltip,
  tags: ['ai-generated'],
  args: {
    glyph: 'InfoWithCircle',
    children: 'Tooltip content',
  },
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 60 }}>
      <IconWithTooltip glyph="InfoWithCircle">
        This is helpful information.
      </IconWithTooltip>
    </div>
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    const icon = canvas.getByRole('img', { name: /info with circle/i });
    await expect(icon).toBeVisible();
    await userEvent.hover(icon);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(
        body.getByText('This is helpful information.'),
      ).toBeVisible(),
    );
  },
};

export const WarningIcon: Story = {
  render: () => (
    <div style={{ padding: 60 }}>
      <IconWithTooltip glyph="Warning">
        This action cannot be undone.
      </IconWithTooltip>
    </div>
  ),
  play: async ({ canvas }) => {
    const icon = canvas.getByRole('img', { name: /warning/i });
    await expect(icon).toBeVisible();
  },
};

export const QuestionMarkIcon: Story = {
  render: () => (
    <div style={{ padding: 60 }}>
      <IconWithTooltip glyph="QuestionMarkWithCircle">
        Click here for more details about this feature.
      </IconWithTooltip>
    </div>
  ),
  play: async ({ canvas }) => {
    const icon = canvas.getByRole('img', { name: /question mark with circle/i });
    await expect(icon).toBeVisible();
  },
};
