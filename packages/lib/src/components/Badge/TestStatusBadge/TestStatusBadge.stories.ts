import type { Meta, StoryObj } from '@storybook/react';
import { TestStatus } from '../../../types/test';
import TestStatusBadge from './index';

const meta = {
  title: 'AI Generated/Simple/TestStatusBadge',
  component: TestStatusBadge,
} satisfies Meta<typeof TestStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pass: Story = {
  args: {
    status: TestStatus.Pass,
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
