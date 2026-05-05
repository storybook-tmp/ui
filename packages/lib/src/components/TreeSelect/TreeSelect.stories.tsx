import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, ALL_VALUE, TreeDataEntry } from './TreeSelect';

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
  args: {
    state: [],
    tData: sampleData,
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
  },
};

export const AllSelected: Story = {
  args: {
    state: [ALL_VALUE, 'fruits', 'apple', 'banana', 'vegetables', 'carrot', 'broccoli'],
    tData: sampleData,
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
};

export const PartialSelection: Story = {
  args: {
    state: ['fruits', 'apple', 'banana'],
    tData: sampleData,
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
};

export const WithInteraction: Story = {
  args: {
    state: [],
    tData: sampleData,
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
  play: async ({ canvas, userEvent }) => {
    const allLabel = canvas.getByText('All');
    await userEvent.click(allLabel);
    const allCheckbox = canvas.getByRole('checkbox', { name: /all/i });
    await expect(allCheckbox).toBeChecked();
  },
};
