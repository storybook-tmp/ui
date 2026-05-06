import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
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

export const LoadingIndicatorVisible: Story = {
  play: async ({ canvasElement }) => {
    const loadingPage = canvasElement.querySelector(
      '[data-cy="loading-page"]',
    ) as HTMLElement;
    await waitFor(() => {
      expect(loadingPage).toBeVisible();
    });
    // Verify the loading text is centered within the full-page container
    await expect(
      getComputedStyle(loadingPage).alignItems,
    ).toBe('center');
  },
};
