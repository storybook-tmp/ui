import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FullPageLoad } from './index';

const meta = {
  component: FullPageLoad,
  tags: ['ai-generated'],
} satisfies Meta<typeof FullPageLoad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('LOADING...')).toBeVisible();
  },
};

export const ChecksLayout: Story = {
  play: async ({ canvas }) => {
    const loadingText = canvas.getByText('LOADING...');
    const loadingPage = loadingText.closest('[data-cy="loading-page"]')!;
    await expect(loadingPage).toBeVisible();
    const style = getComputedStyle(loadingPage);
    await expect(style.display).toBe('flex');
    await expect(style.alignItems).toBe('center');
    await expect(style.justifyContent).toBe('center');
  },
};
