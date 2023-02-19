export const labelSlotName = "labelContent";
export const errorsSlotName = "errors";
export const hintsSlotName = "hints";
export const listSlotName = "list";

export const defaultArgs = {};

export const clientSideValue = [
  {
    name: "first file",
    baseFile:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYEAQAAAAa7ikwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfmCBkNHS2jw6LRAAAAf0lEQVRIx+2VMQ6AIAxFvyaEkcTLMXEORjiUtzDxGqxsbHwHYxhcacToHzu83/40LfAJkdayKiUEj5EkyXVl1VoITrJuG6sxQvB9J5flh78TPl1wIISzlBLgHJBz/84FNAOldMv5kYhaVN6LbdBvMrKJ4Lm+TyLwcJqJ4MscXgfd31tu/nsI5wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wOC0yNVQxMzoyOTo0NSswMDowMNfGwcgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDgtMjVUMTM6Mjk6NDUrMDA6MDCmm3l0AAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIyLTA4LTI1VDEzOjI5OjQ1KzAwOjAw8Y5YqwAAAABJRU5ErkJggg==",
  },
  {
    name: "second file",
    baseFile:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYEAQAAAAa7ikwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfmCBkNHS2jw6LRAAAAf0lEQVRIx+2VMQ6AIAxFvyaEkcTLMXEORjiUtzDxGqxsbHwHYxhcacToHzu83/40LfAJkdayKiUEj5EkyXVl1VoITrJuG6sxQvB9J5flh78TPl1wIISzlBLgHJBz/84FNAOldMv5kYhaVN6LbdBvMrKJ4Lm+TyLwcJqJ4MscXgfd31tu/nsI5wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wOC0yNVQxMzoyOTo0NSswMDowMNfGwcgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDgtMjVUMTM6Mjk6NDUrMDA6MDCmm3l0AAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIyLTA4LTI1VDEzOjI5OjQ1KzAwOjAw8Y5YqwAAAABJRU5ErkJggg==",
  },
];

export async function onUploadData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`test${Math.random()}test+pqql4B8hlPlIsuvkdtKbkr40lpA==`);
    }, 1000);
  });
}

export async function onGenerateFileFromSharepointId(data) {
  console.log("onGenerateFileFromSharepointId", data);
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          new File(["foo"], "foo.txt", {
            type: "image/png",
          })
        ),
      1000
    );
  });
}
