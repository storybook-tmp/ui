import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: 'all', key: 'all' },
  {
    title: 'Frontend',
    value: 'frontend',
    key: 'frontend',
    children: [
      { title: 'React', value: 'react', key: 'react' },
      { title: 'Vue', value: 'vue', key: 'vue' },
    ],
  },
  {
    title: 'Backend',
    value: 'backend',
    key: 'backend',
    children: [
      { title: 'Node', value: 'node', key: 'node' },
      { title: 'Go', value: 'go', key: 'go' },
    ],
  },
];

export const NoneSelected: Story = {
  args: {
    state: [],
    tData: sampleData,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Frontend')).toBeVisible();
    await expect(canvas.getByText('Backend')).toBeVisible();
  },
};

export const SomeSelected: Story = {
  args: {
    state: ['react', 'node'],
    tData: sampleData,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('React')).toBeVisible();
    await expect(canvas.getByText('Node')).toBeVisible();
  },
};

export const AllSelected: Story = {
  args: {
    state: ['all', 'frontend', 'react', 'vue', 'backend', 'node', 'go'],
    tData: sampleData,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
  },
};

export const WithFilterControls: Story = {
  args: {
    state: ['react'],
    tData: sampleData,
    onChange: fn(),
    onFilter: fn(),
    onReset: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Filter')).toBeVisible();
  },
};

export const Interactive: Story = {
  args: {
    state: [],
    tData: sampleData,
    onChange: fn(),
  },
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return (
      <TreeSelect
        state={state}
        tData={sampleData}
        onChange={setState}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen checkbox has pointer-events:none on input, click the label instead
    const reactLabel = canvas.getByText('React');
    await userEvent.click(reactLabel);
    // After clicking, the React checkbox input should be checked
    await expect(canvas.getByLabelText('React')).toBeChecked();
  },
};
