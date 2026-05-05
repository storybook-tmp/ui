import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { ExpiringAnnouncementTooltip } from './index';

const meta = {
  component: ExpiringAnnouncementTooltip,
  tags: ['ai-generated'],
} satisfies Meta<typeof ExpiringAnnouncementTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cookieName: 'storybook-test-tooltip',
    title: 'New Feature',
    children: 'Check out this new feature we just launched!',
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    // The GuideCue renders as a portal outside the canvas
    await waitFor(() => expect(doc.querySelector('[data-cy="announcement-tooltip-trigger"]')).not.toBeNull());
  },
};

export const Loading: Story = {
  args: {
    cookieName: 'storybook-test-loading',
    title: 'Loading Tooltip',
    children: 'Content while loading',
    loading: true,
  },
  play: async ({ canvas }) => {
    // When loading, the tooltip should not render
    const tooltipText = canvas.queryByText('Loading Tooltip');
    await expect(tooltipText).toBeNull();
  },
};
