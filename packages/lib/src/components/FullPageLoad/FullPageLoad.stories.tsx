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

export const CssCheck: Story = {
  play: async ({ canvasElement }) => {
    // Verify emotion-injected styles: FullPage styled div has display:flex
    const container = canvasElement.querySelector<HTMLElement>('[data-cy="loading-page"]');
    await expect(container).not.toBeNull();
    await expect(getComputedStyle(container!).display).toBe('flex');
  },
};
