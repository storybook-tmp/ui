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
    tData: sampleData,
    state: [],
    onChange: () => {},
  },
  render: (args) => {
    const [state, setState] = useState(args.state);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
  },
};

export const WithSelections: Story = {
  args: {
    state: ['apple', 'banana', 'fruits'],
  },
};

export const AllSelected: Story = {
  args: {
    state: [ALL_VALUE, 'fruits', 'apple', 'banana', 'vegetables', 'carrot', 'broccoli'],
  },
};

export const ClickToSelect: Story = {
  play: async ({ canvas, userEvent }) => {
    const appleLabel = canvas.getByText('Apple');
    await userEvent.click(appleLabel);
    // LG Checkbox uses aria-label="checkbox"; find by closest input
    const checkbox = appleLabel.closest('label')?.querySelector('input');
    await expect(checkbox).toBeChecked();
  },
};
