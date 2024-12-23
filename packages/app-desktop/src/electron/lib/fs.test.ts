import {vol} from "memfs"
import { rmIfExists } from "./fs";
import fse from "fs-extra"
import path from "node:path";

beforeEach(()=>{
  vol.fromJSON({});
})

afterEach(()=>{
  vol.reset();
})

it("should remove a file system entry if it exists", async ()=>{
  vol.writeFileSync(path.resolve("/test.txt"), "hello");
  vol.writeFileSync(path.resolve("/should_stay.txt"), "hello");
  await rmIfExists(path.resolve("/test.txt"));
  expect(!await fse.exists(path.resolve("/test.txt")))
  expect(await fse.exists(path.resolve("/should_stay.txt")))
})