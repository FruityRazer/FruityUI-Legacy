# FruityUI

Open-source UI for [FruityRazer](https://github.com/FruityRazer/FruityRazer), open-source Razer drivers for macOS.

This project is currently in a **works for me** state, so consider it pre-alpha software.

If you just want to use it, check the [Releases](https://github.com/FruityRazer/FruityUI/releases) page. Developer ID signed releases are published there.

## Development

First, compile **FruityRazer** and place it under `resources/mac`. **FruityUI** will take care of executing it.

Then, make sure to run `yarn install` to gather all dependencies.

Development: `yarn run electron-dev`
Release: `yarn run preelectron-pack && yarn run electron-pack`

## Documentation

Only a few pointers, for now:

The code for the main electron process is located in `public/js/index.js`.
The UI is made in React, and React code is located in the `src` folder.

## License

This project uses the GPLv3 license.
