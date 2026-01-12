set shell := ["powershell", "-NoProfile", "-Command"]

clean:
    bun utils/incapsula-fetch.ts
    bun utils/incapsula-clean.ts