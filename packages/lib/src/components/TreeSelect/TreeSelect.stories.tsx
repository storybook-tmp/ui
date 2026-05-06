import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, ALL_VALUE, type TreeDataEntry } from './TreeSelect';

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
  args: {
    onChange: () => {},
    state: [],
    tData: sampleData,
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return (
      <TreeSelect
        onChange={setState}
        state={state}
        tData={sampleData}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen Checkbox hides the native input with pointer-events: none
    // Click the label text instead
    const allLabel = canvas.getByText('All');
    await userEvent.click(allLabel);
    // All checkboxes should now be checked
    const allCheckboxes = canvas.getAllByRole('checkbox');
    for (const cb of allCheckboxes) {
      await expect(cb).toBeChecked();
    }
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['apple', 'banana', 'fruits']);
    return (
      <TreeSelect
        onChange={setState}
        state={state}
        tData={sampleData}
      />
    );
  },
};

export const FlatList: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    const flatData: TreeDataEntry[] = [
      { title: 'Option A', value: 'a', key: 'a' },
      { title: 'Option B', value: 'b', key: 'b' },
      { title: 'Option C', value: 'c', key: 'c' },
    ];
    return (
      <TreeSelect
        onChange={setState}
        state={state}
        tData={flatData}
      />
    );
  },
};
