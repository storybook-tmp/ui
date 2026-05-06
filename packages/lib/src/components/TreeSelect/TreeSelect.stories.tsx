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
    tData: sampleData,
    state: [],
    onChange: () => {},
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    // Verify checkboxes render for each tree node
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
  },
};

export const WithPreselected: Story = {
  args: {
    state: ['apple', 'banana', 'fruits'],
  },
};

export const AllSelected: Story = {
  args: {
    state: ['all', 'fruits', 'apple', 'banana', 'vegetables', 'carrot', 'broccoli'],
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect {...args} state={state} onChange={setState} />;
  },
  play: async ({ canvas, userEvent }) => {
    // Click the "All" checkbox label (input has pointer-events: none)
    const allCheckbox = canvas.getByText('All');
    await userEvent.click(allCheckbox);
  },
};

export const WithFilterControls: Story = {
  args: {
    state: ['apple'],
    onReset: () => {},
    onFilter: () => {},
  },
};
