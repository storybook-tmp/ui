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
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: () => {},
    state: [],
    tData: sampleData,
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes.length).toBeGreaterThan(0);
  },
};

export const AllSelected: Story = {
  args: {
    onChange: () => {},
    state: ['all', 'fruits', 'apple', 'banana', 'vegetables', 'carrot', 'broccoli'],
    tData: sampleData,
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
};

export const WithCheckToggle: Story = {
  args: {
    onChange: () => {},
    state: [],
    tData: sampleData,
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen Checkbox hides the native input; click the label instead
    const labels = canvas.getAllByText('All');
    await userEvent.click(labels[0]);
    // After clicking All, all checkboxes should become checked
    const updatedCheckboxes = canvas.getAllByRole('checkbox');
    for (const cb of updatedCheckboxes) {
      await expect(cb).toBeChecked();
    }
  },
};
