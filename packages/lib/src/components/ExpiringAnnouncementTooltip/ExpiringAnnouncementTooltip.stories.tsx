import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import Cookies from 'js-cookie';
import { ExpiringAnnouncementTooltip } from '.';

const meta = {
  component: ExpiringAnnouncementTooltip,
  tags: ['ai-generated'],
} satisfies Meta<typeof ExpiringAnnouncementTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cookieName: 'storybook-announcement-default',
    title: 'New Feature',
    children: 'Check out this new feature we just released!',
  },
  async beforeEach() {
    Cookies.remove('storybook-announcement-default');
  },
  play: async ({ canvasElement }) => {
    // The GuideCue renders in a portal, so query from the document
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      expect(doc.body.querySelector('[data-cy="announcement-tooltip-trigger"]')).toBeInTheDocument();
    });
  },
};

export const AlreadySeen: Story = {
  args: {
    cookieName: 'storybook-announcement-seen',
    title: 'Old Feature',
    children: 'You have already seen this.',
    activeDays: 30,
  },
  async beforeEach() {
    Cookies.set('storybook-announcement-seen', new Date().toString(), { expires: 365 });
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    // The info icon should still be visible since activeDays is 30
    await waitFor(() => {
      expect(doc.body.querySelector('[data-cy="announcement-tooltip-trigger"]')).toBeInTheDocument();
    });
  },
};

export const Loading: Story = {
  args: {
    cookieName: 'storybook-announcement-loading',
    title: 'Loading Feature',
    children: 'This content is loading.',
    loading: true,
  },
  async beforeEach() {
    Cookies.remove('storybook-announcement-loading');
  },
  play: async ({ canvasElement }) => {
    // When loading=true, the component should not render
    const trigger = canvasElement.querySelector('[data-cy="announcement-tooltip-trigger"]');
    await expect(trigger).toBeNull();
  },
};
