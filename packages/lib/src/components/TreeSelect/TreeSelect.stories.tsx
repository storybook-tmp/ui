import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreeSelect, ALL_VALUE } from './TreeSelect';
import type { TreeDataEntry } from './TreeSelect';

const fruitData: TreeDataEntry[] = [
  {
    title: 'All',
    value: ALL_VALUE,
    key: 'all',
  },
  {
    title: 'Citrus',
    value: 'citrus',
    key: 'citrus',
    children: [
      { title: 'Orange', value: 'orange', key: 'orange' },
      { title: 'Lemon', value: 'lemon', key: 'lemon' },
    ],
  },
  {
    title: 'Berries',
    value: 'berries',
    key: 'berries',
    children: [
      { title: 'Strawberry', value: 'strawberry', key: 'strawberry' },
      { title: 'Blueberry', value: 'blueberry', key: 'blueberry' },
    ],
  },
];

const meta = {
  title: 'AI Generated/Complex/TreeSelect',
  component: TreeSelect,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tData: fruitData,
    state: [],
    onChange: () => {},
  },
};

export const AllSelected: Story = {
  args: {
    tData: fruitData,
    state: [ALL_VALUE, 'citrus', 'orange', 'lemon', 'berries', 'strawberry', 'blueberry'],
    onChange: () => {},
  },
};

export const PartialSelection: Story = {
  args: {
    tData: fruitData,
    state: ['citrus', 'orange', 'lemon'],
    onChange: () => {},
  },
};
