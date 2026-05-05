import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import PageSizeSelector from './index';

const meta = {
  title: 'AI Generated/Simple/PageSizeSelector',
  component: PageSizeSelector,
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 10,
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    value: 20,
    disabled: true,
    onChange: fn(),
  },
};
