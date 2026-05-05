import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
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
      { title: 'Cherry', value: 'cherry', key: 'cherry' },
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
    state: [],
    tData: sampleData,
    onChange: () => {},
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect state={state} tData={sampleData} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['apple', 'banana']);
    return <TreeSelect state={state} tData={sampleData} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    const appleCheckbox = canvas.getByLabelText('Apple');
    const bananaCheckbox = canvas.getByLabelText('Banana');
    await expect(appleCheckbox).toBeChecked();
    await expect(bananaCheckbox).toBeChecked();
  },
};

export const AllSelected: Story = {
  render: () => {
    const allValues = [ALL_VALUE, 'fruits', 'apple', 'banana', 'cherry', 'vegetables', 'carrot', 'broccoli'];
    const [state, setState] = useState<string[]>(allValues);
    return <TreeSelect state={state} tData={sampleData} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    const allCheckbox = canvas.getByLabelText('All');
    await expect(allCheckbox).toBeChecked();
  },
};

export const ToggleCheckbox: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect state={state} tData={sampleData} onChange={setState} />;
  },
  play: async ({ canvas, userEvent }) => {
    const appleCheckbox = canvas.getByLabelText('Apple');
    await expect(appleCheckbox).not.toBeChecked();
    // Click the label text instead of the input (LeafyGreen checkbox input has pointer-events: none)
    await userEvent.click(canvas.getByText('Apple'));
    await waitFor(() => {
      expect(canvas.getByLabelText('Apple')).toBeChecked();
    });
  },
};
