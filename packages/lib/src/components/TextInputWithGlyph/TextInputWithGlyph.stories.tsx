import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextInputWithGlyph } from './index';
import Icon from '../Icon';

const meta = {
  component: TextInputWithGlyph,
  tags: ['ai-generated'],
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
  },
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox')).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Icon glyph="MagnifyingGlass" />,
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    persistentPlaceholder: 'filter:',
    placeholder: 'value',
    label: 'Filter input',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Cannot edit',
  },
};
