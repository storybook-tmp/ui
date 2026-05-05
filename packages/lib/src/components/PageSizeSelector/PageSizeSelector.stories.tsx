import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import PageSizeSelector from '.';

const meta = {
  component: PageSizeSelector,
  tags: ['ai-generated'],
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <PageSizeSelector {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: 10,
    onChange: () => {},
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    // Verify the select shows the current page size
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
    disabled: true,
  },
};
