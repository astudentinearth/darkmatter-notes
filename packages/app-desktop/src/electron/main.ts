import { is } from "@electron-toolkit/utils";
import { app, BrowserWindow, shell } from "electron";
import log from "electron-log/main.js";
import { createRequire } from "node:module";
import path, { join } from "node:path";
import "reflect-metadata";
import { readUserPrefs } from "./api/settings";
import { AppDataSource } from "./db";
import "./ipc";
import { initAppMenu } from "./menu";
/*import installExtension, {
    REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";*/
import { fileURLToPath } from "node:url";

log.initialize();
/*const require = createRequire(import.meta.url);*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win: BrowserWindow | null;

const DEV_SERVER_URL =
    process.env["ELECTRON_RENDERER_URL"] ?? "http://localhost:5173";

function createWindow() {
    //const prefs = readUserPrefs();
    log.debug("creating main window");
    win = new BrowserWindow({
        webPreferences: {
            preload: join(__dirname, "preload.mjs"),
        },
        icon: is.dev ? join(__dirname, "../resources/icon.png") : undefined,
        titleBarStyle:
            process.platform === "win32" || process.platform === "linux"
                ? "hidden"
                : "default", //TODO: Implement experimental support for macOS later
        titleBarOverlay:
            process.platform === "win32" || process.platform === "linux"
                ? {
                      color: "#13131300",
                      symbolColor: "#ffffff",
                      height: 48,
                  }
                : false,
    });
    // Test active push message to Renderer-process.
    win.webContents.on("did-finish-load", () => {
        win?.webContents.send(
            "main-process-message",
            new Date().toLocaleString(),
        );
    });

    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: "deny" };
    });

    if (is.dev && DEV_SERVER_URL) {
        win.loadURL(DEV_SERVER_URL);
    } else {
        win.loadFile(join(__dirname, "../dist/index.html"));
    }
    initAppMenu();
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
        win = null;
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(() => {
    /*if (is.dev) {
        installExtension([REACT_DEVELOPER_TOOLS]).then((name) => {
            console.log(`Added extension => ${name}`);
        });
    }*/
    AppDataSource.initialize().then(createWindow);
});