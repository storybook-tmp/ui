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
  play: async ({ canvas }) => {
    const loadingDiv = canvas.getByText('LOADING...').parentElement!;
    const styles = getComputedStyle(loadingDiv);
    await expect(styles.display).toBe('flex');
    await expect(styles.alignItems).toBe('center');
  },
};
