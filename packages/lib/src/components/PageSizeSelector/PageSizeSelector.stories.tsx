import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import PageSizeSelector from '.';

const meta = {
  component: PageSizeSelector,
  tags: ['ai-generated'],
  args: {
    value: 10,
    onChange: () => {},
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const select = canvas.getByRole('button', { name: /10 \/ page/i });
    await expect(select).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole('button', { name: /10 \/ page/i });
    await expect(select).toHaveAttribute('aria-disabled', 'true');
  },
};

export const LargePageSize: Story = {
  args: {
    value: 100,
  },
};
