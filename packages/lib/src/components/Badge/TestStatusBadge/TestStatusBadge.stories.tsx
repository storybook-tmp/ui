import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import TestStatusBadge from '.';
import { TestStatus } from '../../../types/test';

const meta = {
  component: TestStatusBadge,
  tags: ['ai-generated'],
} satisfies Meta<typeof TestStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pass: Story = {
  args: {
    status: TestStatus.Pass,
  },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Pass');
    await expect(badge).toHaveAttribute('data-cy', 'test-status-badge');
  },
};

export const Fail: Story = {
  args: {
    status: TestStatus.Fail,
  },
};

export const Skip: Story = {
  args: {
    status: TestStatus.Skip,
  },
};

export const SilentFail: Story = {
  args: {
    status: TestStatus.SilentFail,
  },
};
