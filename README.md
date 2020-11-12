# Peachtree Bank

## Project setup
### Install vue cli 3
``` npm install -g @vue/cli ```

### Install all necessary dependencies
``` npm install ```

## Run Project
### Compiles and hot-reloads for development
``` npm run serve ```

### Compiles and minifies for production
```npm run build```

### Run your unit tests
``` npm run test:unit ```
### Lints and fixes files
``` npm run lint ```

## Framework used in the project
``` vuejs (vue 3x)```

Due to my understanding of VueJS than Angular so I decided to choose VueJS to promote my ability.

## Project Structure
- assets — All assets that are imported into components
- components — All the components of the projects that are not the main views
- constants - All constants used to in the project.
- interfaces - All interface used to in the project.
- router — All the routes of projects
- store — The Vuex constants in mutation-type.ts, action-types.ts and the Vuex modules in the subfolder modules (which are then loaded in the index.ts).
- locales — Locales files(Using i18n for localization)
- utils— Functions that I use in some components
- views — Including all main component(each component is a screen) in the project.
