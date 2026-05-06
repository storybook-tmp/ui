import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const simpleData: TreeDataEntry[] = [
  { title: 'All', value: 'all', key: 'all' },
  { title: 'Success', value: 'success', key: 'success' },
  { title: 'Failed', value: 'failed', key: 'failed' },
  { title: 'Running', value: 'running', key: 'running' },
];

const hierarchicalData: TreeDataEntry[] = [
  { title: 'All', value: 'all', key: 'all' },
  {
    title: 'Failures',
    value: 'failures',
    key: 'failures',
    children: [
      { title: 'Test Failed', value: 'test-failed', key: 'test-failed' },
      { title: 'System Failed', value: 'system-failed', key: 'system-failed' },
      { title: 'Setup Failed', value: 'setup-failed', key: 'setup-failed' },
    ],
  },
  {
    title: 'Success',
    value: 'success',
    key: 'success',
  },
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  args: {
    onChange: () => {},
    state: [],
    tData: simpleData,
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
        tData={simpleData}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Success')).toBeVisible();
    await expect(canvas.getByText('Failed')).toBeVisible();
    await expect(canvas.getByText('Running')).toBeVisible();
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['success', 'failed']);
    return (
      <TreeSelect
        onChange={setState}
        state={state}
        tData={simpleData}
      />
    );
  },
  play: async ({ canvas }) => {
    const successCheckbox = canvas.getByLabelText('Success');
    const failedCheckbox = canvas.getByLabelText('Failed');
    await expect(successCheckbox).toBeChecked();
    await expect(failedCheckbox).toBeChecked();
  },
};

export const Hierarchical: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return (
      <TreeSelect
        onChange={setState}
        state={state}
        tData={hierarchicalData}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Failures')).toBeVisible();
    await expect(canvas.getByText('Test Failed')).toBeVisible();
    await expect(canvas.getByText('System Failed')).toBeVisible();
    // Click the label text to toggle checkbox (input itself has pointer-events: none)
    await userEvent.click(canvas.getByText('Failures'));
    await expect(canvas.getByLabelText('Test Failed')).toBeChecked();
    await expect(canvas.getByLabelText('System Failed')).toBeChecked();
    await expect(canvas.getByLabelText('Setup Failed')).toBeChecked();
  },
};
