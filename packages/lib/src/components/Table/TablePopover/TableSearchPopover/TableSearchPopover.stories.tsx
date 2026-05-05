import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import TableSearchPopover from './index';

const meta = {
  component: TableSearchPopover,
  tags: ['ai-generated'],
} satisfies Meta<typeof TableSearchPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return <TableSearchPopover {...args} value={value} onConfirm={setValue} />;
  },
  args: {
    value: '',
    onConfirm: () => {},
    placeholder: 'Search...',
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    // Click the search icon to open the popover
    const searchButton = canvas.getByRole('button', { name: /table search popover icon/i });
    await userEvent.click(searchButton);
    // LeafyGreen popover renders in document body
    const body = canvasElement.ownerDocument.body;
    await expect(body.querySelector('[role="searchbox"]')).not.toBeNull();
  },
};

export const WithExistingValue: Story = {
  args: {
    value: 'existing filter',
    onConfirm: () => {},
    placeholder: 'Search...',
  },
};
