import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: 'all', key: 'all' },
  {
    title: 'Fruits',
    value: 'fruits',
    key: 'fruits',
    children: [
      { title: 'Apple', value: 'apple', key: 'apple' },
      { title: 'Banana', value: 'banana', key: 'banana' },
    ],
  },
  {
    title: 'Vegetables',
    value: 'vegetables',
    key: 'vegetables',
    children: [
      { title: 'Carrot', value: 'carrot', key: 'carrot' },
      { title: 'Broccoli', value: 'broccoli', key: 'broccoli' },
    ],
  },
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  render: (args) => {
    const [state, setState] = useState(args.state);
    return <TreeSelect {...args} state={state} onChange={setState} />;
  },
  args: {
    tData: sampleData,
    state: [],
    onChange: () => {},
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    // LG Checkbox input has pointer-events: none; click the label text instead
    const fruitLabel = canvas.getByText('Fruits');
    await userEvent.click(fruitLabel);
    const fruitCheckbox = canvas.getByLabelText('Fruits');
    await expect(fruitCheckbox).toBeChecked();
  },
};

export const AllSelected: Story = {
  args: {
    state: ['all', 'fruits', 'apple', 'banana', 'vegetables', 'carrot', 'broccoli'],
  },
};

export const PartiallySelected: Story = {
  args: {
    state: ['apple', 'carrot'],
  },
};
