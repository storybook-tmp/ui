import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, type TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: 'all', key: 'all' },
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
  { title: 'Duration', value: 'duration', key: 'duration' },
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state || []);
    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
  args: {
    tData: sampleData,
    state: [],
    onChange: () => {},
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Status')).toBeVisible();
  },
};

export const WithPreselected: Story = {
  args: {
    state: ['passed', 'failed'],
  },
};

export const CheckboxInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const allLabel = canvas.getByText('All');
    await userEvent.click(allLabel);
    const allCheckbox = canvas.getByLabelText('All');
    await expect(allCheckbox).toBeChecked();
  },
};
