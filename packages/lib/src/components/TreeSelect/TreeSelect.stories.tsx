import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, ALL_VALUE, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: ALL_VALUE, key: 'all' },
  {
    title: 'Status',
    value: 'status',
    key: 'status',
    children: [
      { title: 'Running', value: 'running', key: 'running' },
      { title: 'Failed', value: 'failed', key: 'failed' },
      { title: 'Succeeded', value: 'succeeded', key: 'succeeded' },
    ],
  },
  { title: 'Pending', value: 'pending', key: 'pending' },
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state ?? []);
    return <TreeSelect {...args} state={state} onChange={setState} />;
  },
  args: {
    state: [],
    tData: sampleData,
    onChange: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const allLabel = canvas.getByText('All');
    await userEvent.click(allLabel);
    // After clicking "All", all checkboxes should be checked
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes[0]).toBeChecked();
  },
};

export const WithPreselection: Story = {
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state ?? ['running']);
    return <TreeSelect {...args} state={state} onChange={setState} />;
  },
  args: {
    state: ['running'],
    tData: sampleData,
    onChange: () => {},
  },
};

export const Hidden: Story = {
  args: {
    state: [],
    tData: sampleData,
    onChange: () => {},
    isVisible: false,
  },
};
