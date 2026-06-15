import type { Meta, StoryObj } from '@storybook/react-vite';
import TestStatusBadge from './index';
import { TestStatus } from '../../../types/test';

const meta = {
  title: 'AI Generated/Simple/TestStatusBadge',
  component: TestStatusBadge,
  parameters: {
    layout: 'centered',
  },
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

export const SilentFail: Story = {
  args: {
    status: TestStatus.SilentFail,
  },
};
