import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const treeData: TreeDataEntry[] = [
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
      { title: 'Ubuntu 20.04', value: 'ubuntu2004', key: 'ubuntu2004' },
      { title: 'RHEL 8', value: 'rhel8', key: 'rhel8' },
      { title: 'Windows', value: 'windows', key: 'windows' },
    ],
  },
  {
    title: 'Distros',
    value: 'distros',
    key: 'distros',
    children: [
      { title: 'Small', value: 'small', key: 'small' },
      { title: 'Large', value: 'large', key: 'large' },
    ],
  },
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  args: {
    tData: treeData,
    state: [],
    onChange: () => {},
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect tData={treeData} state={state} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Build Variants')).toBeVisible();
    await expect(canvas.getByText('Distros')).toBeVisible();
  },
};

export const WithSelection: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(['ubuntu2004', 'rhel8']);
    return <TreeSelect tData={treeData} state={state} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    const ubuntuCheckbox = canvas.getByLabelText('Ubuntu 20.04');
    const rhelCheckbox = canvas.getByLabelText('RHEL 8');
    await expect(ubuntuCheckbox).toBeChecked();
    await expect(rhelCheckbox).toBeChecked();
  },
};

export const AllSelected: Story = {
  render: () => {
    const allValues = [
      'all',
      'build-variants',
      'ubuntu2004',
      'rhel8',
      'windows',
      'distros',
      'small',
      'large',
    ];
    const [state, setState] = useState<string[]>(allValues);
    return <TreeSelect tData={treeData} state={state} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    const allCheckbox = canvas.getByLabelText('All');
    await expect(allCheckbox).toBeChecked();
  },
};

export const ToggleCheckbox: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect tData={treeData} state={state} onChange={setState} />;
  },
  play: async ({ canvas, userEvent }) => {
    const windowsLabel = canvas.getByText('Windows');
    await userEvent.click(windowsLabel);
    const windowsCheckbox = canvas.getByLabelText('Windows');
    await expect(windowsCheckbox).toBeChecked();
  },
};
