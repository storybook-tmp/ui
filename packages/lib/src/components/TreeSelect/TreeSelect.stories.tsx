import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { TreeSelect } from './TreeSelect';
import type { TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  {
    title: 'All',
    value: 'all',
    key: 'all',
  },
  {
    title: 'Builds',
    value: 'builds',
    key: 'builds',
    children: [
      { title: 'Linux', value: 'linux', key: 'linux' },
      { title: 'Windows', value: 'windows', key: 'windows' },
      { title: 'macOS', value: 'macos', key: 'macos' },
    ],
  },
  {
    title: 'Tests',
    value: 'tests',
    key: 'tests',
    children: [
      { title: 'Unit', value: 'unit', key: 'unit' },
      { title: 'Integration', value: 'integration', key: 'integration' },
    ],
  },
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoneSelected: Story = {
  args: {
    tData: sampleData,
    state: [],
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Builds')).toBeVisible();
    await expect(canvas.getByText('Tests')).toBeVisible();
  },
};

export const WithSelections: Story = {
  args: {
    tData: sampleData,
    state: ['linux', 'windows'],
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    const linuxCheckbox = canvas.getByLabelText('Linux');
    const windowsCheckbox = canvas.getByLabelText('Windows');
    await expect(linuxCheckbox).toBeChecked();
    await expect(windowsCheckbox).toBeChecked();
  },
};

export const AllSelected: Story = {
  args: {
    tData: sampleData,
    state: ['all', 'builds', 'linux', 'windows', 'macos', 'tests', 'unit', 'integration'],
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    const allCheckbox = canvas.getByLabelText('All');
    await expect(allCheckbox).toBeChecked();
  },
};
