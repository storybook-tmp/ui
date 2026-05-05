import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import PageSizeSelector from '.';

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

export const Default: Story = {};

export const LargePageSize: Story = {
  args: { value: 100 },
};

export const Disabled: Story = {
  args: { disabled: true },
};
