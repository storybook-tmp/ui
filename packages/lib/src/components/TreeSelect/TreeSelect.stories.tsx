import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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
      { title: 'Cherry', value: 'cherry', key: 'cherry' },
    ],
  },
  {
    title: 'Vegetables',
    value: 'vegetables',
    key: 'vegetables',
    children: [
      { title: 'Carrot', value: 'carrot', key: 'carrot' },
      { title: 'Pea', value: 'pea', key: 'pea' },
    ],
  },
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return <TreeSelect {...args} state={state} onChange={setState} />;
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tData: sampleData,
    state: [],
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
  },
};

export const WithSelections: Story = {
  args: {
    tData: sampleData,
    state: ['apple', 'banana'],
    onChange: () => {},
  },
};

export const AllSelected: Story = {
  args: {
    tData: sampleData,
    state: ['all', 'fruits', 'apple', 'banana', 'cherry', 'vegetables', 'carrot', 'pea'],
    onChange: () => {},
  },
};

export const ToggleSelection: Story = {
  args: {
    tData: sampleData,
    state: [],
    onChange: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen Checkbox hides the native input; click the label text instead
    const appleLabel = canvas.getByText('Apple');
    await userEvent.click(appleLabel);
    const appleCheckbox = canvas.getByLabelText('Apple');
    await expect(appleCheckbox).toBeChecked();
  },
};
