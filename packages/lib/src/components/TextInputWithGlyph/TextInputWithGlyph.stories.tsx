import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextInputWithGlyph } from './index';
import Icon from '../Icon';

const meta = {
  component: TextInputWithGlyph,
  tags: ['ai-generated'],
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Search',
    placeholder: 'Enter a value...',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Search');
    await userEvent.type(input, 'hello');
    await expect(input).toHaveValue('hello');
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Filter',
    placeholder: 'Type to filter...',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    label: 'Duration',
    persistentPlaceholder: <span>ms</span>,
  },
};
