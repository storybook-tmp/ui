import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  {
    title: 'All',
    value: 'all',
    key: 'all',
  },
  {
    title: 'Build Variants',
    value: 'build-variants',
    key: 'build-variants',
    children: [
      { title: 'Ubuntu 18.04', value: 'ubuntu1804', key: 'ubuntu1804' },
      { title: 'Windows', value: 'windows', key: 'windows' },
      { title: 'macOS', value: 'macos', key: 'macos' },
    ],
  },
  {
    title: 'Task Names',
    value: 'task-names',
    key: 'task-names',
    children: [
      { title: 'Lint', value: 'lint', key: 'lint' },
      { title: 'Unit Tests', value: 'unit-tests', key: 'unit-tests' },
      { title: 'Integration Tests', value: 'integration-tests', key: 'integration-tests' },
    ],
  },
];

const TreeSelectWrapper = ({ initialState = [] }: { initialState?: string[] }) => {
  const [state, setState] = useState<string[]>(initialState);
  return (
    <TreeSelect
      state={state}
      tData={sampleData}
      onChange={setState}
    />
  );
};

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
  render: () => <TreeSelectWrapper />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Build Variants')).toBeVisible();
    await expect(canvas.getByText('Task Names')).toBeVisible();
  },
};

export const WithPreselected: Story = {
  render: () => <TreeSelectWrapper initialState={['lint', 'ubuntu1804']} />,
  play: async ({ canvas }) => {
    const lintCheckbox = canvas.getByLabelText('Lint');
    await expect(lintCheckbox).toBeChecked();
    const ubuntuCheckbox = canvas.getByLabelText('Ubuntu 18.04');
    await expect(ubuntuCheckbox).toBeChecked();
  },
};

export const SelectAll: Story = {
  render: () => <TreeSelectWrapper />,
  play: async ({ canvas, userEvent }) => {
    const allCheckbox = canvas.getByLabelText('All');
    await expect(allCheckbox).not.toBeChecked();
    // Click the label text instead of the input (which has pointer-events: none)
    await userEvent.click(canvas.getByText('All'));
    // After clicking All, all checkboxes should be checked
    await expect(canvas.getByLabelText('Build Variants')).toBeChecked();
    await expect(canvas.getByLabelText('Task Names')).toBeChecked();
    await expect(canvas.getByLabelText('Lint')).toBeChecked();
  },
};
