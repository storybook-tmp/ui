import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  title: 'AI Generated/Complex/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Expand me',
    children: 'This is the accordion content',
    onToggle: fn(),
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Already expanded',
    children: 'This accordion starts open',
    defaultOpen: true,
    onToggle: fn(),
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Main Title',
    subtitle: 'Subtitle text',
    children: 'Accordion content goes here',
    onToggle: fn(),
  },
};

export const WithTogglableTitle: Story = {
  args: {
    title: 'Click to expand',
    toggledTitle: 'Click to collapse',
    children: 'Content that changes with the state',
    onToggle: fn(),
  },
};

export const CaretAtStart: Story = {
  args: {
    title: 'Caret on the left',
    children: 'The caret icon is positioned at the start',
    caretAlign: AccordionCaretAlign.Start,
    onToggle: fn(),
  },
};

export const WithChevronIcon: Story = {
  args: {
    title: 'Using chevron icon',
    children: 'This accordion uses a chevron instead of a caret',
    caretIcon: AccordionCaretIcon.Chevron,
    onToggle: fn(),
  },
};
