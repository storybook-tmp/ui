import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, ALL_VALUE, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: ALL_VALUE, key: 'all' },
  {
    title: 'Build',
    value: 'build',
    key: 'build',
    children: [
      { title: 'Compile', value: 'compile', key: 'compile' },
      { title: 'Link', value: 'link', key: 'link' },
    ],
  },
  {
    title: 'Test',
    value: 'test',
    key: 'test',
    children: [
      { title: 'Unit', value: 'unit', key: 'unit' },
      { title: 'Integration', value: 'integration', key: 'integration' },
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
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return (
      <TreeSelect
        onChange={setState}
        state={state}
        tData={sampleData}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Build')).toBeVisible();
    await expect(canvas.getByText('Test')).toBeVisible();
    await expect(canvas.getByText('Compile')).toBeVisible();
    await expect(canvas.getByText('Integration')).toBeVisible();
  },
};

export const AllSelected: Story = {
  render: () => {
    const allValues = [ALL_VALUE, 'build', 'compile', 'link', 'test', 'unit', 'integration'];
    const [state, setState] = useState<string[]>(allValues);
    return (
      <TreeSelect
        onChange={setState}
        state={state}
        tData={sampleData}
      />
    );
  },
  play: async ({ canvas }) => {
    // LeafyGreen Checkbox hides the native input, so query by label text
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Build')).toBeVisible();
    await expect(canvas.getByText('Test')).toBeVisible();
  },
};

export const PartialSelection: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['build', 'compile', 'link']);
    return (
      <TreeSelect
        onChange={setState}
        state={state}
        tData={sampleData}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Build')).toBeVisible();
    await expect(canvas.getByText('Compile')).toBeVisible();
    await expect(canvas.getByText('Link')).toBeVisible();
    await expect(canvas.getByText('Test')).toBeVisible();
  },
};
