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
  render: (args) => {
    const [value, setValue] = useState(args.value ?? 10);
    return <PageSizeSelector {...args} onChange={setValue} value={value} />;
  },
  args: {
    value: 10,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    // The select should display the current page size
    await expect(canvas.getByText('10 / page')).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    value: 20,
    disabled: true,
    onChange: () => {},
  },
};
