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
    const [value, setValue] = useState(args.value);
    return <PageSizeSelector {...args} onChange={setValue} value={value} />;
  },
  args: { value: 10, onChange: () => {} },
  play: async ({ canvas }) => {
    const select = canvas.getByRole('button', { name: /10 \/ page/i });
    await expect(select).toBeVisible();
  },
};

export const Disabled: Story = {
  args: { value: 20, disabled: true, onChange: () => {} },
};
