import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, ALL_VALUE, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  {
    title: 'All',
    value: ALL_VALUE,
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
    tData: sampleData,
    state: [],
    onChange: () => {},
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoneSelected: Story = {
  render: () => {
    const Wrapper = () => {
      const [state, setState] = useState<string[]>([]);
      return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
    };
    return <Wrapper />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
  },
};

export const AllSelected: Story = {
  render: () => {
    const Wrapper = () => {
      const allValues = [ALL_VALUE, 'fruits', 'apple', 'banana', 'vegetables', 'carrot', 'broccoli'];
      const [state, setState] = useState<string[]>(allValues);
      return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
    };
    return <Wrapper />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Apple')).toBeVisible();
    await expect(canvas.getByText('Banana')).toBeVisible();
    await expect(canvas.getByText('Carrot')).toBeVisible();
    await expect(canvas.getByText('Broccoli')).toBeVisible();
  },
};

export const PartialSelection: Story = {
  render: () => {
    const Wrapper = () => {
      const [state, setState] = useState<string[]>(['fruits', 'apple', 'banana']);
      return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
    };
    return <Wrapper />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Apple')).toBeVisible();
  },
};
