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
    tData: sampleData,
    state: [],
    onChange: () => {},
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

export const AllSelected: Story = {
  render: () => {
    const allValues = [ALL_VALUE, 'fruits', 'apple', 'banana', 'cherry', 'vegetables', 'carrot', 'broccoli'];
    const [state, setState] = useState<string[]>(allValues);
    return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole('checkbox');
    // All checkboxes should be checked
    for (const checkbox of checkboxes) {
      await expect(checkbox).toBeChecked();
    }
  },
};

export const PartialSelection: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['apple', 'banana']);
    return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Apple')).toBeChecked();
    await expect(canvas.getByLabelText('Banana')).toBeChecked();
    await expect(canvas.getByLabelText('Cherry')).not.toBeChecked();
    await expect(canvas.getByLabelText('Vegetables')).not.toBeChecked();
  },
};

export const WithFilterControls: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['apple']);
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
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Filter')).toBeVisible();
    await expect(canvas.getByText('Reset')).toBeVisible();
  },
};

export const ToggleCheckbox: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
  },
  play: async ({ canvas, userEvent }) => {
    const appleCheckbox = canvas.getByLabelText('Apple');
    await expect(appleCheckbox).not.toBeChecked();
    // Click the label text rather than the hidden input
    await userEvent.click(canvas.getByText('Apple'));
    await expect(appleCheckbox).toBeChecked();
  },
};
