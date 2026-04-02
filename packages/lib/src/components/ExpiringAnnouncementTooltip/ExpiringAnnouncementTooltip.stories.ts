import type { Meta, StoryObj } from '@storybook/react';
import { ExpiringAnnouncementTooltip } from './index';

const meta = {
  title: 'AI Generated/Medium/ExpiringAnnouncementTooltip',
  component: ExpiringAnnouncementTooltip,
} satisfies Meta<typeof ExpiringAnnouncementTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cookieName: 'test-announcement',
    title: 'New Feature Available',
    children: 'We just launched a new feature. Check it out!',
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    cookieName: 'test-announcement-loading',
    title: 'Loading Content',
    children: 'Please wait...',
    loading: true,
  },
};

export const AlignmentTop: Story = {
  args: {
    cookieName: 'test-announcement-top',
    title: 'Announcement',
    children: 'This tooltip is aligned to the top',
    tooltipAlign: 'top',
  },
};
