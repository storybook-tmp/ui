import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, ALL_VALUE } from './TreeSelect';
import type { TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: ALL_VALUE, key: 'all' },
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
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state ?? []);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
  args: {
    tData: sampleData,
    state: [],
    onChange: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    // Click the "Fruits" label text (checkbox input has pointer-events: none)
    await userEvent.click(canvas.getByText('Fruits'));
    // Children should be checked too
    await expect(canvas.getByLabelText('Apple')).toBeChecked();
    await expect(canvas.getByLabelText('Banana')).toBeChecked();
  },
};

export const AllSelected: Story = {
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state ?? []);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
  args: {
    tData: sampleData,
    state: [ALL_VALUE, 'fruits', 'apple', 'banana', 'vegetables', 'carrot', 'broccoli'],
    onChange: () => {},
  },
};

export const FlatList: Story = {
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state ?? []);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
  args: {
    tData: [
      { title: 'Option A', value: 'a', key: 'a' },
      { title: 'Option B', value: 'b', key: 'b' },
      { title: 'Option C', value: 'c', key: 'c' },
    ],
    state: [],
    onChange: () => {},
  },
};
