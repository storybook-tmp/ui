import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import PageSizeSelector from './index';

const meta = {
  component: PageSizeSelector,
  tags: ['ai-generated'],
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 10,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /10 \/ page/i })).toBeVisible();
  },
};

export const LargePageSize: Story = {
  args: {
    value: 100,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    value: 10,
    disabled: true,
    onChange: () => {},
  },
};

export const Interactive: Story = {
  args: {
    value: 10,
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(10);
    return <PageSizeSelector {...args} onChange={setValue} value={value} />;
  },
};
