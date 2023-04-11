import { CSSObject } from "@emotion/react";

export const getCustomStyles = () => ({
  container: (styles: CSSObject) => ({
    ...styles,
    cursor: "pointer",
    boxShadow: "none",
  }),
  control: (styles: CSSObject, { isFocused, menuIsOpen }: { isFocused: boolean, menuIsOpen: boolean }) => ({
    ...styles,
    boxShadow: "none",
    cursor: "pointer",
    ":hover": { borderColor: "var(--secondary-color-900)" },
    ...((isFocused || menuIsOpen) && {
      border: "2px solid var(--primary-color-500) !important",
    }),
  }),
  option: (styles: CSSObject) => ({
    ...styles,
    backgroundColor: "none",
    ":hover": {
      backgroundColor: "var(--primary-color-200) !important",
      cursor: "pointer",
    }
  }),
});