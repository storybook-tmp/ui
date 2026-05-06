import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import PageSizeSelector from './index';

const PageSizeSelectorWithState = ({ initialValue = 10 }: { initialValue?: number }) => {
  const [value, setValue] = useState(initialValue);
  return <PageSizeSelector onChange={setValue} value={value} />;
};

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
  render: () => <PageSizeSelectorWithState />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('10 / page')).toBeVisible();
  },
};

export const LargePageSize: Story = {
  render: () => <PageSizeSelectorWithState initialValue={100} />,
};

export const Disabled: Story = {
  args: {
    value: 10,
    onChange: () => {},
    disabled: true,
  },
};
