const headers = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/151.0.0.0 Safari/537.36 Edg/151.0.0.0",
  referer: "http://localhost:8080/Profile/viewer/viewer",
  "sec-ch-ua-platform": '"Windows"',
  "sec-ch-ua": '"Not=A?Brand";v="99", "Microsoft Edge";v="151", "Chromium";v="151"',
  "sec-ch-ua-mobile": "?0",
};

fetch("http://localhost:8080/Profile/industrial-era-profile.pdf", { headers })
  .then(async (r) => {
    const buf = await r.arrayBuffer();
    console.log(
      "status",
      r.status,
      "len",
      buf.byteLength,
      "ct",
      r.headers.get("content-type")
    );
  })
  .catch((e) => console.error(e));
