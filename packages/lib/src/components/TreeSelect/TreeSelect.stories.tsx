import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, ALL_VALUE, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  {
    title: 'All',
    value: ALL_VALUE,
    key: 'all',
  },
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
      { title: 'Unit Tests', value: 'unit', key: 'unit' },
      { title: 'Integration Tests', value: 'integration', key: 'integration' },
    ],
  },
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  args: {
    tData: sampleData,
    state: [ALL_VALUE],
    onChange: () => {},
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([ALL_VALUE, 'build', 'compile', 'link', 'test', 'unit', 'integration']);
    return (
      <TreeSelect
        tData={sampleData}
        state={state}
        onChange={setState}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByLabelText('All')).toBeChecked();
  },
};

export const WithPartialSelection: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['build', 'compile', 'link']);
    return (
      <TreeSelect
        tData={sampleData}
        state={state}
        onChange={setState}
      />
    );
  },
  play: async ({ canvas }) => {
    const buildCheckbox = canvas.getByLabelText('Build');
    await expect(buildCheckbox).toBeChecked();
    const testCheckbox = canvas.getByLabelText('Test');
    await expect(testCheckbox).not.toBeChecked();
  },
};

export const WithInteraction: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([ALL_VALUE, 'build', 'compile', 'link', 'test', 'unit', 'integration']);
    return (
      <TreeSelect
        tData={sampleData}
        state={state}
        onChange={setState}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const allCheckbox = canvas.getByLabelText('All');
    await expect(allCheckbox).toBeChecked();
    // LeafyGreen checkbox input has pointer-events: none, click the label text instead
    await userEvent.click(canvas.getByText('All'));
    await expect(allCheckbox).not.toBeChecked();
  },
};
