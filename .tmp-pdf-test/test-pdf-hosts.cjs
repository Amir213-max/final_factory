const urls = [
  "http://127.0.0.1:8080/Profile/industrial-era-profile.pdf",
  "http://[::1]:8080/Profile/industrial-era-profile.pdf",
  "http://localhost:8080/Profile/industrial-era-profile.pdf",
];

(async () => {
  for (const url of urls) {
    const r = await fetch(url);
    const len = (await r.arrayBuffer()).byteLength;
    console.log(url, r.status, len);
  }
})();
