import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: 'all', key: 'all' },
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
  { title: 'Priority', value: 'priority', key: 'priority' },
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  args: {
    onChange: fn(),
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
    await expect(canvas.getByText('Status')).toBeVisible();
    await expect(canvas.getByText('Priority')).toBeVisible();
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['running', 'failed']);
    return (
      <TreeSelect
        onChange={setState}
        state={state}
        tData={sampleData}
      />
    );
  },
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole('checkbox');
    // "Running" and "Failed" should be checked
    const runningCheckbox = canvas.getByLabelText('Running');
    const failedCheckbox = canvas.getByLabelText('Failed');
    await expect(runningCheckbox).toBeChecked();
    await expect(failedCheckbox).toBeChecked();
    await expect(checkboxes.length).toBeGreaterThan(0);
  },
};

export const ToggleCheckbox: Story = {
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
  play: async ({ canvas, userEvent }) => {
    const priorityCheckbox = canvas.getByLabelText('Priority');
    await expect(priorityCheckbox).not.toBeChecked();
    // LeafyGreen Checkbox uses pointer-events: none on the input, click the label text
    await userEvent.click(canvas.getByText('Priority'));
    await expect(priorityCheckbox).toBeChecked();
  },
};
