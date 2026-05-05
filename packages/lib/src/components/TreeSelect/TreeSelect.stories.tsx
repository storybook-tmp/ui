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

const allValues = [ALL_VALUE, 'fruits', 'apple', 'banana', 'vegetables', 'carrot', 'broccoli'];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  args: {
    tData: sampleData,
    onChange: () => {},
    state: [],
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSelected: Story = {
  args: {
    state: allValues,
    onChange: () => {},
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(allValues);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
  play: async ({ canvas }) => {
    const allCheckbox = canvas.getByLabelText('All');
    await expect(allCheckbox).toBeChecked();
  },
};

export const NoneSelected: Story = {
  args: {
    state: [],
    onChange: () => {},
  },
  render: (args) => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
};

export const PartialSelection: Story = {
  args: {
    state: ['apple', 'carrot'],
    onChange: () => {},
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(['apple', 'carrot']);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
};

export const Interactive: Story = {
  args: {
    state: [],
    onChange: () => {},
  },
  render: (args) => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen checkbox hides the real input; click the label text instead
    const allLabel = canvas.getByText('All');
    await userEvent.click(allLabel);
    await expect(canvas.getByLabelText('All')).toBeChecked();
    await expect(canvas.getByLabelText('Apple')).toBeChecked();
  },
};
