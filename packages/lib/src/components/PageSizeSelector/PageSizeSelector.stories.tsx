import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import PageSizeSelector from './index';

const meta = {
  component: PageSizeSelector,
  tags: ['ai-generated'],
  args: {
    value: 10,
    onChange: fn(),
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('10 / page')).toBeVisible();
  },
};

export const LargePageSize: Story = {
  args: { value: 100 },
};

export const Disabled: Story = {
  args: { disabled: true },
};
