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
    state: [],
    tData: sampleData,
    onChange: () => {},
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
        state={state}
        onChange={setState}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
    await expect(canvas.getByText('Apple')).toBeVisible();
    await expect(canvas.getByText('Banana')).toBeVisible();
  },
};

export const WithPreselectedItems: Story = {
  args: {
    state: ['apple', 'banana'],
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return (
      <TreeSelect
        {...args}
        state={state}
        onChange={setState}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Apple')).toBeVisible();
    await expect(canvas.getByText('Banana')).toBeVisible();
  },
};

export const WithFilterControls: Story = {
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return (
      <TreeSelect
        {...args}
        state={state}
        onChange={setState}
        onReset={() => setState([])}
        onFilter={() => {}}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Filter')).toBeVisible();
    await expect(canvas.getByText('All')).toBeVisible();
  },
};

export const AllSelected: Story = {
  args: {
    state: [ALL_VALUE, 'fruits', 'apple', 'banana', 'cherry', 'vegetables', 'carrot', 'broccoli'],
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return (
      <TreeSelect
        {...args}
        state={state}
        onChange={setState}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await userEvent.click(canvas.getByText('All'));
  },
};
