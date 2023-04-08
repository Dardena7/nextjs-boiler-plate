// i18next.d.ts
import i18next from "i18next";

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
  interface i18n {
    reportNamespaces: ReportNamespaces;
    language: string;
  }
}