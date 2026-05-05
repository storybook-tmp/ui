import preview from '#.storybook/preview';
import { expect } from 'storybook/test';
import { FullPageLoad } from './index';

const meta = preview.meta({
  component: FullPageLoad,
  tags: ['ai-generated'],
});

export default meta;

export const Default = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText('LOADING...')).toBeVisible();
  },
});
