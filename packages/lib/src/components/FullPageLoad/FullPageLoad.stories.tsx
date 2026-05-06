import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FullPageLoad } from '.';

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

export const CenteredLayout: Story = {
  play: async ({ canvas }) => {
    const loadingText = canvas.getByText('LOADING...');
    const wrapper = loadingText.closest('[data-cy="loading-page"]') as HTMLElement;
    await expect(getComputedStyle(wrapper).display).toBe('flex');
    await expect(getComputedStyle(wrapper).alignItems).toBe('center');
    await expect(getComputedStyle(wrapper).justifyContent).toBe('center');
  },
};
