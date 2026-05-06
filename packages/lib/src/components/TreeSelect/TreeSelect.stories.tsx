import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  {
    title: 'All',
    value: 'all',
    key: 'all',
  },
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
    // LeafyGreen Checkbox uses a custom element; click the visible label text
    const appleLabel = canvas.getByText('Apple');
    await userEvent.click(appleLabel);
    await expect(canvas.getByLabelText('Apple')).toBeChecked();
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

export const AllSelected: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([
      'all', 'fruits', 'apple', 'banana', 'vegetables', 'carrot', 'broccoli',
    ]);
    return (
      <TreeSelect
        onChange={setState}
        state={state}
        tData={sampleData}
      />
    );
  },
};
