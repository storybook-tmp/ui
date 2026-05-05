import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Click to expand',
    children: <p>Accordion content here</p>,
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    const container = canvasElement.querySelector('[data-cy="accordion-collapse-container"]')!;
    await expect(container).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    await expect(container).toHaveAttribute('aria-expanded', 'true');
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Already expanded',
    children: <p>This content is visible by default</p>,
    defaultOpen: true,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Section title',
    subtitle: <span>Additional info</span>,
    children: <p>Content with subtitle</p>,
  },
};

export const CaretAlignStart: Story = {
  args: {
    title: 'Caret aligned to start',
    children: <p>Content here</p>,
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
  },
};
