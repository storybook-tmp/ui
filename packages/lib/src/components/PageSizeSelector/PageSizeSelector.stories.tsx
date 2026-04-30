import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import PageSizeSelector from './index';

const meta = {
  title: 'AI Generated/Medium/PageSizeSelector',
  component: PageSizeSelector,
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(10);
    return <PageSizeSelector value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState(25);
    return <PageSizeSelector value={value} onChange={setValue} disabled />;
  },
};
