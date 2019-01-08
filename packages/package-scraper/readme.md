# package-scraper

- parses the dino package [database.json](https://raw.githubusercontent.com/denoland/registry/master/src/database.json)
- retrieves metadata from github for each package
- loads meta into the denolandia database

## usage

- `npx tsc`
- `ENV_SETTING_A=... ... ENV_SETTING_N=... node build/bin.js`
   - where required ENV keys can be found in `src/scraper.ts`

## debug

- run the api from the api dir, `yarn start`
- `GITHUB_TOKEN=$(cat .ghtoken) node --inspect-brk build/scraper.js`
