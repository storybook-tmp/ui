import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: 'all', key: 'all' },
  {
    title: 'Compile',
    value: 'compile',
    key: 'compile',
    children: [
      { title: 'Compile Linux', value: 'compile-linux', key: 'compile-linux' },
      { title: 'Compile macOS', value: 'compile-macos', key: 'compile-macos' },
    ],
  },
  {
    title: 'Test',
    value: 'test',
    key: 'test',
    children: [
      { title: 'Unit Tests', value: 'unit-tests', key: 'unit-tests' },
      {
        title: 'Integration Tests',
        value: 'integration-tests',
        key: 'integration-tests',
      },
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
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect state={state} tData={sampleData} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes.length).toBeGreaterThan(0);
  },
};

export const WithPreselection: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([
      'all',
      'compile',
      'compile-linux',
      'compile-macos',
      'test',
      'unit-tests',
      'integration-tests',
    ]);
    return <TreeSelect state={state} tData={sampleData} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes[0]).toBeChecked();
  },
};

export const Interactive: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect state={state} tData={sampleData} onChange={setState} />;
  },
  play: async ({ canvas, userEvent }) => {
    // Click the label text "Compile" to toggle the checkbox
    // (native checkbox input has pointer-events: none in LeafyGreen)
    const compileLabel = canvas.getByText('Compile');
    await userEvent.click(compileLabel);
    const checkboxes = canvas.getAllByRole('checkbox');
    // Compile parent (index 1, after "All") should now be checked
    await expect(checkboxes[1]).toBeChecked();
  },
};
