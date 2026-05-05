import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
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
  args: {
    tData: sampleData,
    state: [],
    onChange: fn(),
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['apple', 'banana', 'fruits']);
    return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Apple')).toBeVisible();
  },
};

export const Interactive: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
  },
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen Checkbox uses pointer-events:none on the input, click the label instead
    const allLabel = canvas.getByText('All');
    await userEvent.click(allLabel);
    const checkboxes = canvas.getAllByRole('checkbox');
    for (const checkbox of checkboxes) {
      await expect(checkbox).toBeChecked();
    }
  },
};
