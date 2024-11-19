import {
    DarkwriteDesktopClientInfo,
    Note,
    NoteExportType,
} from "@darkwrite/common";
import { UserSettings } from "@darkwrite/common";
import { ElectronAPI } from "@electron-toolkit/preload";

/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

interface Navigator {
    windowControlsOverlay?: WindowControlsOverlay;
}

/**
 * Type definition for WindowControlsOverlay API
 * https://developer.mozilla.org/en-US/docs/Web/API/Window_Controls_Overlay_API
 */
interface WindowControlsOverlay extends EventTarget {
    visible: boolean;
    getTitlebarAreaRect(): DOMRect;
    ongeometrychange:
        | ((this: WindowControlsOverlay, e: Event) => unknown)
        | null;
}

declare global {
    type Result<T, E> =
        | { value: T; error?: undefined }
        | { value?: undefined; error: E };

    interface Window {
        electron: ElectronAPI;
        api: DarkwriteElectronAPI;
    }

    type Result<T, E> =
        | { value: T; error?: undefined }
        | { value?: undefined; error: E };

    interface DarkwriteElectronAPI {
        /**
         * Displays the app menu
         */
        showAppMenu: () => void;
        note: {
            /** Creates a new note.
             * @returns the Note object if successful, null if unsuccessful
             */
            create: (title: string, parent?: string) => Promise<Note | null>;
            /**
             * Updates the stored JSON contents of the note.
             * @param id ID of the note
             * @param content stringified JSON to overwrite with
             * @returns
             */
            setContents: (id: string, content: string) => Promise<void>;
            /**
             * Reads the stored JSON contents of the note.
             * @param id - ID of the note
             * @returns JSON content in string form
             */
            getContents: (id: string) => Promise<string>;
            /**
             * Deletes a note **permanently**.
             * @param id ID of the note to delete
             */
            delete: (id: string) => Promise<void>;
            /**
             * Moves a note below another note, or to the top level
             * @param sourceID - ID of the note to move
             * @param destID - ID of the note to move into, or `undefined` if the top level is desired
             * @returns
             */
            move: (
                sourceID: string,
                destID: string | undefined,
            ) => Promise<void>;
            /**
             * Performs a database update for the given note. All fields are updated with the passed parameter.
             * @param note The partial note object to update with. An ID must be provided.
             */
            update: (note: Partial<Note>) => Promise<void>;
            /**
             * Gets all notes from the database.
             * @returns an array of notes.
             */
            getAll: () => Promise<Note[]>;
            /**
             * Moves a note in or out of trash.
             * @param id - ID of the note
             * @param state - true moves to trash, false moves out of trash
             */
            setTrashStatus: (id: string, state: boolean) => Promise<void>;
            /**
             * Finds a single note
             * @param id - ID of the note to look for
             * @returns the note if it exists, null if it doesn't exist or something goes wrong
             */
            getNote: (id: string) => Promise<Note | null>;
            /**
             * Updates multiple notes at once
             * @param notes array of notes to update
             */
            saveAll: (notes: Note[]) => Promise<void>;
            /**
             * Shows a save file dialog to export a note
             * @param title note title to use as file name
             * @param content contents of the note
             * @param exportType format to export notes in.
             * @returns
             */
            export: (
                title: string,
                content: string,
                exportType: NoteExportType,
            ) => Promise<void>;
            /**
             * Shows a dialog to open an HTML file.
             * @returns the contents to import later.
             */
            importHTML: () => Promise<string>;
        };
        settings: {
            load: () => Promise<UserSettings | null>;
            save: (data: UserSettings) => Promise<void>;
        };
        getClientInfo: () => Promise<DarkwriteDesktopClientInfo>;
    }
}