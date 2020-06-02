# Adminpro

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

##Para la version 2, tendriamos ya generar los archivos para produccion (DIST) #usamos los siguiente comandos:

ng build --prod --aot

Con el flag "--prod" deberia optimizar el codigo para produccion pero puedes intentar indicar explicitamente al CLI que debe hacerlo, con el flag:

ng build --prod --build-optimizer

o

ng build --prod --aot --vendor-chunk --common-chunk --delete-output-path --buildOptimizer

npm install --global http-server

http-server -o -p4200

## Funciona con:

ng build --prod --build-optimizer

npm install --global http-server

##### El http Server ejecutarlo dentro de la carpeta adminpro

http-server -o -p4200

##### Luego ingresar con localhost:4200 
