import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
  args: {
    title: 'Accordion Title',
    children: <div>Accordion content goes here.</div>,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    // Accordion starts collapsed by default — aria-expanded should be false on the container
    const container = canvas.getByLabelText('Accordion icon');
    await expect(container).toBeVisible();
    // Click to expand
    await userEvent.click(toggle);
    const expandedContent = canvas.getByText('Accordion content goes here.');
    await expect(expandedContent).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: <span>Additional subtitle info</span>,
    defaultOpen: true,
  },
};

export const CaretAlignStart: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: true,
  },
};

export const CaretIcon: Story = {
  args: {
    caretIcon: AccordionCaretIcon.Caret,
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Styled Accordion',
    children: <div>Content</div>,
  },
  play: async ({ canvasElement }) => {
    // AccordionToggle uses `display: flex` via Emotion — fails if CSS-in-JS did not load.
    const toggle = canvasElement.querySelector('[data-cy="accordion-toggle"]')!;
    await expect(getComputedStyle(toggle).display).toBe('flex');
  },
};
