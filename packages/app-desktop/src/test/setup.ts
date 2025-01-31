import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

vi.mock("zustand");

vi.mock("node:fs");
vi.mock("node:fs/promises");

vi.mock("@electron-toolkit/utils", () => ({
  is: {
    dev: true,
  },
}));

vi.mock("electron", () => ({
  app: {
    getPath: (pathType: string) => {
      return `/${pathType}/`;
    },
  },
}));

vi.mock("@renderer/lib/api/note", () => ({
  createNote: vi.fn(),
  updateContents: vi.fn(),
  getContents: vi.fn(),
  deleteNote: vi.fn(),
  moveNote: vi.fn(),
  updateNote: vi.fn(),
  getNotes: vi.fn(),
  moveToTrash: vi.fn(),
  restoreFromTrash: vi.fn(),
  getNote: vi.fn(),
  saveAll: vi.fn(),
}));

vi.mock("@renderer/lib/app-menu", () => ({
  showAppMenu: vi.fn(),
}));

vi.mock("@renderer/lib/api/exporter.ts", () => ({
  ExporterModel: {
    exportAllAsHTML: vi.fn(),
  },
}));

vi.mock("@renderer/lib/api/backup.ts", () => ({
  BackupModel: {
    backupData: vi.fn(),
  },
}));

vi.mock("@renderer/lib/api/theme.ts", () => ({}));

vi.mock("@renderer/lib/api/embed.ts", () => ({}));

afterEach(() => {
  cleanup();
});
