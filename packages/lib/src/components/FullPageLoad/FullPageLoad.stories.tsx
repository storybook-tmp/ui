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

export const LayoutStyles: Story = {
  play: async ({ canvas }) => {
    const loadingText = canvas.getByText('LOADING...');
    const loadingPage = loadingText.parentElement!;
    const styles = getComputedStyle(loadingPage);
    // FullPage uses display: flex and centers content
    await expect(styles.display).toBe('flex');
    await expect(styles.alignItems).toBe('center');
    await expect(styles.justifyContent).toBe('center');
  },
};
