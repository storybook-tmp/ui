import preview from '#.storybook/preview';
import { expect } from 'storybook/test';
import { TestStatus } from '../../../types/test';
import TestStatusBadge from './index';

const meta = preview.meta({
  component: TestStatusBadge,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
});

export default meta;

export const Pass = meta.story({
  args: {
    status: TestStatus.Pass,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pass')).toBeVisible();
  },
});

export const Fail = meta.story({
  args: {
    status: TestStatus.Fail,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Fail')).toBeVisible();
  },
});

export const Skip = meta.story({
  args: {
    status: TestStatus.Skip,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Skip')).toBeVisible();
  },
});

export const SilentFail = meta.story({
  args: {
    status: TestStatus.SilentFail,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Silent Fail')).toBeVisible();
  },
});
