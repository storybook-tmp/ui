import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { TreeSelect, ALL_VALUE, type TreeDataEntry } from '.';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: ALL_VALUE, key: 'all' },
  {
    title: 'Status',
    value: 'status',
    key: 'status',
    children: [
      { title: 'Passed', value: 'passed', key: 'passed' },
      { title: 'Failed', value: 'failed', key: 'failed' },
      { title: 'Skipped', value: 'skipped', key: 'skipped' },
    ],
  },
  { title: 'Running', value: 'running', key: 'running' },
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  args: {
    tData: sampleData,
    onChange: fn(),
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state ?? []);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: [],
  },
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen Checkbox has pointer-events: none on the native input; click the label instead
    const label = canvas.getByText('All');
    await userEvent.click(label);
    await expect(canvas.getAllByRole('checkbox')[0]).toBeChecked();
  },
};

export const WithPreselected: Story = {
  args: {
    state: ['running'],
  },
};

export const AllSelected: Story = {
  args: {
    state: [ALL_VALUE, 'status', 'passed', 'failed', 'skipped', 'running'],
  },
};
