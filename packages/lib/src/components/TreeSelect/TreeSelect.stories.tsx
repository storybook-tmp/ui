import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: 'all', key: 'all' },
  {
    title: 'Fruits',
    value: 'fruits',
    key: 'fruits',
    children: [
      { title: 'Apple', value: 'apple', key: 'apple' },
      { title: 'Banana', value: 'banana', key: 'banana' },
    ],
  },
  {
    title: 'Vegetables',
    value: 'vegetables',
    key: 'vegetables',
    children: [
      { title: 'Carrot', value: 'carrot', key: 'carrot' },
      { title: 'Broccoli', value: 'broccoli', key: 'broccoli' },
    ],
  },
];

const TreeSelectWrapper = (props: { tData: TreeDataEntry[]; initialState?: string[] }) => {
  const [state, setState] = useState<string[]>(props.initialState ?? []);
  return <TreeSelect onChange={setState} state={state} tData={props.tData} />;
};

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  render: (args) => <TreeSelectWrapper tData={args.tData} />,
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tData: sampleData,
    state: [],
    onChange: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen Checkbox hides the native input; click the label text instead
    const allLabel = canvas.getByText('All');
    await expect(allLabel).toBeVisible();
    await userEvent.click(allLabel);
    // After clicking All, all checkboxes should be checked
    const appleCheckbox = canvas.getByLabelText('Apple');
    await expect(appleCheckbox).toBeChecked();
  },
};

export const WithPreselection: Story = {
  args: {
    tData: sampleData,
    state: [],
    onChange: () => {},
  },
  render: () => <TreeSelectWrapper tData={sampleData} initialState={['apple', 'banana', 'fruits']} />,
};
