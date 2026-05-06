import { useState } from 'react';
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
    title: 'Ubuntu',
    value: 'ubuntu',
    key: 'ubuntu',
    children: [
      { title: 'Ubuntu 20.04', value: 'ubuntu2004', key: 'ubuntu2004' },
      { title: 'Ubuntu 22.04', value: 'ubuntu2204', key: 'ubuntu2204' },
    ],
  },
  {
    title: 'Windows',
    value: 'windows',
    key: 'windows',
    children: [
      { title: 'Windows 10', value: 'win10', key: 'win10' },
      { title: 'Windows 11', value: 'win11', key: 'win11' },
    ],
  },
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  args: {
    tData: sampleData,
    onChange: () => {},
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state ?? []);
    return <TreeSelect {...args} state={state} onChange={setState} />;
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { state: [], onChange: () => {} },
  play: async ({ canvas, userEvent }) => {
    // Click the "Ubuntu" checkbox label (input itself has pointer-events: none)
    const ubuntuLabel = canvas.getByText('Ubuntu');
    await userEvent.click(ubuntuLabel);
    await expect(canvas.getByLabelText('Ubuntu')).toBeChecked();
  },
};

export const WithPreselected: Story = {
  args: { state: ['ubuntu', 'ubuntu2004', 'ubuntu2204'], onChange: () => {} },
};

export const AllSelected: Story = {
  args: { state: ['all', 'ubuntu', 'ubuntu2004', 'ubuntu2204', 'windows', 'win10', 'win11'], onChange: () => {} },
};
