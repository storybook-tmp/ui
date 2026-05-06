import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { fn } from 'storybook/test';
import PageSizeSelector from './index';

const meta = {
  component: PageSizeSelector,
  tags: ['ai-generated'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 10,
  },
  play: async ({ canvas }) => {
    // The select should show the current page size
    await expect(canvas.getByText('10 / page')).toBeVisible();
  },
};

export const LargePageSize: Story = {
  args: {
    value: 100,
  },
};

export const Disabled: Story = {
  args: {
    value: 20,
    disabled: true,
  },
};
