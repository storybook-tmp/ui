import { useMemo } from "react";
import { Global } from "@emotion/react";
import { MemoryRouter } from "react-router-dom";
import type { Preview } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { resetStyles, bodyStyles } from "../src/components/styles/globalStyles";
import { fontStyles } from "../src/components/styles/fonts";
import { ToastContext } from "../src/context/toast";

const MockToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toastContext = useMemo(
    () => ({
      error: (message: React.ReactNode, closable: boolean = true) =>
        action("Toast Error")({ closable, message }),
      hide: () => action("Toast Hide")(),
      info: (message: React.ReactNode, closable: boolean = true) =>
        action("Toast Info")({ closable, message }),
      progress: (
        message: React.ReactNode,
        progress: number = 0.5,
        closable: boolean = true,
      ) => action("Toast Progress")({ closable, message, progress }),
      success: (message: React.ReactNode, closable: boolean = true) =>
        action("Toast Success")({ closable, message }),
      warning: (message: React.ReactNode, closable: boolean = true) =>
        action("Toast Warning")({ closable, message }),
    }),
    [],
  );

  return (
    <ToastContext.Provider value={toastContext}>
      {children}
    </ToastContext.Provider>
  );
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <MockToastProvider>
        <MemoryRouter>
          <Global styles={[resetStyles, bodyStyles, fontStyles]} />
          <Story />
        </MemoryRouter>
      </MockToastProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
