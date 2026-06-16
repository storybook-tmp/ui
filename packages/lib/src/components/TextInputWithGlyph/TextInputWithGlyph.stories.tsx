import type { Meta, StoryObj } from '@storybook/react';
import Icon from '../Icon';
import { TextInputWithGlyph } from './index';

const meta = {
  title: 'AI Generated/Medium/TextInputWithGlyph',
  component: TextInputWithGlyph,
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  render: () => (
    <TextInputWithGlyph
      placeholder="Enter search text"
      icon={<Icon glyph="Search" />}
    />
  ),
};

export const WithPersistentPlaceholder: Story = {
  args: {
    placeholder: 'Enter value',
    persistentPlaceholder: 'Prefix:',
  },
};
