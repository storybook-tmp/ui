import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const meta = {
  title: 'AI Generated/Complex/TreeSelect',
  component: TreeSelect,
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: TreeDataEntry[] = [
  {
    title: 'Option A',
    value: 'opt-a',
    key: 'opt-a',
    children: [
      { title: 'Option A.1', value: 'opt-a-1', key: 'opt-a-1' },
      { title: 'Option A.2', value: 'opt-a-2', key: 'opt-a-2' },
    ],
  },
  {
    title: 'Option B',
    value: 'opt-b',
    key: 'opt-b',
    children: [
      { title: 'Option B.1', value: 'opt-b-1', key: 'opt-b-1' },
    ],
  },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <TreeSelect
        state={selected}
        onChange={setSelected}
        tData={sampleData}
        isVisible={true}
      />
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['opt-a-1']);
    return (
      <TreeSelect
        state={selected}
        onChange={setSelected}
        tData={sampleData}
        isVisible={true}
      />
    );
  },
};
