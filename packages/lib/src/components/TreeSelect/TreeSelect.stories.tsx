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
  args: {
    onChange: () => {},
    state: [],
    tData: sampleData,
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return (
      <TreeSelect
        {...args}
        onChange={setState}
        state={state}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen checkbox inputs have pointer-events: none; click labels instead
    const labels = canvas.getAllByText(/All|Fruits|Vegetables|Apple|Banana|Carrot|Broccoli/);
    await expect(labels.length).toBeGreaterThan(0);
    // Click the "All" label
    await userEvent.click(canvas.getByText('All'));
    const allCheckbox = canvas.getAllByRole('checkbox')[0];
    await expect(allCheckbox).toBeChecked();
  },
};

export const WithPreselected: Story = {
  args: {
    state: ['apple', 'banana', 'fruits'],
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return (
      <TreeSelect
        {...args}
        onChange={setState}
        state={state}
      />
    );
  },
};

export const WithFilterControls: Story = {
  render: (args) => {
    const [state, setState] = useState<string[]>([]);
    return (
      <TreeSelect
        {...args}
        onChange={setState}
        onFilter={() => {}}
        onReset={() => setState([])}
        state={state}
      />
    );
  },
};
