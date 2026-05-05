import { fn } from 'storybook/test';
import preview from '#.storybook/preview';
import { expect } from 'storybook/test';
import PageSizeSelector from './index';

const meta = preview.meta({
  component: PageSizeSelector,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onChange: fn(),
  },
});

export default meta;

export const Default = meta.story({
  args: {
    value: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /10 \/ page/i })).toBeVisible();
  },
});

export const LargePageSize = meta.story({
  args: {
    value: 100,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /100 \/ page/i })).toBeVisible();
  },
});

export const Disabled = meta.story({
  args: {
    value: 20,
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /20 \/ page/i })).toHaveAttribute('aria-disabled', 'true');
  },
});
