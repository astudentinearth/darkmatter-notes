import { is } from "@electron-toolkit/utils";
import { Paths } from "@main/lib/paths";
import fse from "fs-extra";
import { fs, vol } from "memfs";
import path from "node:path";
import { HTMLExporterAPI } from "./backup.electron";
import * as log from "@main/lib/log"

//FIXME: we can't reliably mock fs-extra
//you should probably split your code

vi.spyOn(is, "dev", "get").mockReturnValue(false);

const errorLogFn = vi.fn((error: unknown, fallbackMessage?: string)=>{console.log(error instanceof Error ? error.message : fallbackMessage)});
vi.spyOn(log, "logError").mockImplementation(errorLogFn);

beforeEach(() => {
  vol.fromJSON({});
});

afterEach(() => {
  vol.reset();
});

describe.skip("electron: html exporter api tests", () => {
  test.fails("exporter cache should be removed before a new one is created", async () => {
    await fse.ensureDir(Paths.EXPORTER_CACHE_DIR);
    await fse.writeFile(
      path.join(Paths.EXPORTER_CACHE_DIR, "test.html"),
      "I'll be gone",
    );
    await HTMLExporterAPI.initializeExporterCache();
    expect(await fse.exists(Paths.EXPORTER_CACHE_DIR));
    expect((await fse.readdir(Paths.EXPORTER_CACHE_DIR)).length).toBe(0);
  });

  test.fails("exporter cache directory should be created if it does not exist", async () => {
    expect((await fs.existsSync(Paths.EXPORTER_CACHE_DIR))).toBe(false);
    await fse.ensureDir(Paths.CACHE_DIR);
    await HTMLExporterAPI.initializeExporterCache();
    expect(await fse.exists(Paths.EXPORTER_CACHE_DIR));
  });

  test.fails("push should fail if cache is not initialized", async ()=>{
    console.log(Paths.EXPORTER_CACHE_DIR);
    console.log(vol.readdirSync("/"))
    console.log(await fse.exists(Paths.EXPORTER_CACHE_DIR));
    await HTMLExporterAPI.pushToExporterCache("note.html", "<p>Hello</p>");
    expect(errorLogFn).toBeCalled();
  })
});
