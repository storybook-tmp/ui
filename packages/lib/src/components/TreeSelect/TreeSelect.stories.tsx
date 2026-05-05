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
    tData: sampleData,
    state: [],
    onChange: () => {},
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['all', 'fruits', 'apple', 'banana', 'vegetables', 'carrot', 'broccoli']);
    return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes.length).toBeGreaterThan(0);
  },
};

export const NoneSelected: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
  },
};

export const WithFilter: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['fruits', 'apple', 'banana']);
    return (
      <TreeSelect
        tData={sampleData}
        state={state}
        onChange={setState}
        onReset={() => setState([])}
        onFilter={() => {}}
      />
    );
  },
};

export const ToggleCheckbox: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
  },
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen Checkbox input has pointer-events: none, click the label text instead
    const fruitsLabel = canvas.getByText('Fruits');
    await userEvent.click(fruitsLabel);
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes[1]).toBeChecked();
  },
};
