# Metmuseum

Simple viewer of [Metropolitan Museum of Art](https://www.metmuseum.org/) API.

See the [API](https://metmuseum.github.io/) for more information.

## Development instructions

```
npm run install

npm run dev
```

## Technical details

- Project was created using `npm create vite@latest metmuseum --template react`.
- [Vite](https://vitejs.dev/) is used as a module bundler.
- [Redux toolkit](https://redux-toolkit.js.org/) is used as a state management tool.
- Frontend is written in [React](https://reactjs.org/).


## Resources

Another projects using the API or exploring the dataset.

- https://towardsdatascience.com/metropolitan-museum-of-art-data-analysis-and-visualization-7d1d023c68fe
- https://github.com/mgoetzke/MappingTheMet

## TODO, Known issues

- If one object request fails, whole table is not loaded ( e.g. Artist or Culture - David Roentgen )