import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import PageSizeSelector from './index';

const PageSizeSelectorWrapper = (props: { initialValue?: number }) => {
  const [value, setValue] = useState(props.initialValue ?? 10);
  return <PageSizeSelector onChange={setValue} value={value} />;
};

const meta = {
  component: PageSizeSelector,
  tags: ['ai-generated'],
  render: (args) => <PageSizeSelectorWrapper initialValue={args.value} />,
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 10,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    // The select should show current page size
    const button = canvas.getByRole('button', { name: /10 \/ page/i });
    await expect(button).toBeVisible();
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
    value: 20,
    onChange: () => {},
    disabled: true,
  },
  render: () => <PageSizeSelector disabled onChange={() => {}} value={20} />,
};
