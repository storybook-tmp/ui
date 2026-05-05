import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import TestStatusBadge from './index';

const meta = {
  component: TestStatusBadge,
  title: 'Components/Badge/TestStatusBadge',
} satisfies Meta<typeof TestStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pass: Story = {
  args: {
    status: 'pass',
  },
  play: async (context) => {
    const canvas = context.canvas;
    const badge = await canvas.findByRole('img');
    await expect(badge).toBeVisible();
    await expect(canvas.getByText('Pass')).toBeInTheDocument();
  },
};

export const Fail: Story = {
  args: {
    status: 'fail',
  },
  play: async (context) => {
    const canvas = context.canvas;
    const badge = await canvas.findByRole('img');
    await expect(badge).toBeVisible();
    await expect(canvas.getByText('Fail')).toBeInTheDocument();
  },
};

export const Skip: Story = {
  args: {
    status: 'skip',
  },
  play: async (context) => {
    const canvas = context.canvas;
    const badge = await canvas.findByRole('img');
    await expect(badge).toBeVisible();
    await expect(canvas.getByText('Skip')).toBeInTheDocument();
  },
};

export const SilentFail: Story = {
  args: {
    status: 'silentfail',
  },
  play: async (context) => {
    const canvas = context.canvas;
    const badge = await canvas.findByRole('img');
    await expect(badge).toBeVisible();
    await expect(canvas.getByText('Silent Fail')).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    status: null,
  },
  play: async (context) => {
    const canvas = context.canvas;
    // When status is null, the component returns null
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument();
  },
};
