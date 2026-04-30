import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { TreeSelect, type TreeDataEntry } from './TreeSelect';

const mockTreeData: TreeDataEntry[] = [
  {
    title: 'Platform',
    value: 'platform',
    key: 'platform',
    children: [
      { title: 'Linux', value: 'linux', key: 'linux' },
      { title: 'Windows', value: 'windows', key: 'windows' },
      { title: 'macOS', value: 'macos', key: 'macos' },
    ],
  },
  {
    title: 'Architecture',
    value: 'architecture',
    key: 'architecture',
    children: [
      { title: 'x86_64', value: 'x86_64', key: 'x86_64' },
      { title: 'ARM', value: 'arm', key: 'arm' },
    ],
  },
];

const meta = {
  title: 'AI Generated/Medium/TreeSelect',
  component: TreeSelect,
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tData: mockTreeData,
    state: [],
    onChange: fn(),
    isVisible: true,
  },
};

export const WithSelection: Story = {
  args: {
    tData: mockTreeData,
    state: ['linux', 'windows'],
    onChange: fn(),
    isVisible: true,
  },
};

export const WithControls: Story = {
  args: {
    tData: mockTreeData,
    state: [],
    onChange: fn(),
    onReset: fn(),
    onFilter: fn(),
    isVisible: true,
  },
};
