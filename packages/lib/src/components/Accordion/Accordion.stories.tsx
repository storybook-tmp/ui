import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
  args: {
    title: 'Accordion Title',
    children: <div>Accordion content goes here</div>,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    // Accordion starts closed — the collapse container should have aria-expanded=false
    const collapseContainer = canvas.getByLabelText('Accordion icon').closest('div')!.parentElement!;
    const expandedDiv = collapseContainer.querySelector('[aria-expanded]')!;
    await expect(expandedDiv).toHaveAttribute('aria-expanded', 'false');
    // Click to expand
    await userEvent.click(toggle);
    await expect(expandedDiv).toHaveAttribute('aria-expanded', 'true');
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    children: <div>This content is visible by default</div>,
  },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: <span>Subtitle text</span>,
    children: <div>Content with subtitle</div>,
  },
};

export const CaretAlignStart: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: true,
  },
};

export const CaretIconCaret: Story = {
  args: {
    caretIcon: AccordionCaretIcon.Caret,
  },
};

export const WithToggledTitle: Story = {
  args: {
    toggledTitle: 'Toggled Title (Expanded)',
    defaultOpen: true,
  },
};
