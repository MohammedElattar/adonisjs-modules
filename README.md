# AdonisJS Modules

This package provides a module-based architecture for AdonisJS, inspired by the popular Laravel modules package. It enables developers to structure their AdonisJS applications using a modular approach, organizing features into individual modules.

## Installation

To install the package, run the following command:

```bash
npm install adonisjs-modules
```

## Configuration

After installing the package, configure it by running:

```bash
node ace configure adonisjs-modules
```

This will set up the necessary files and make the commands available to you.

## Creating a Module

To create a new module, run:

```bash
node ace module:make <module_name>
```

Replace `<module_name>` with the actual name of the module you want to create.

## Using a Module

If you want to set a module as the default module, run:

```bash
node ace module:use <module_name>
```

If you don’t set a default module, you will be required to pass the `--module=<module_name>` flag with each command you execute.

## Available Commands

Once the package is configured, you can use the following commands to generate various module components. To see the list of available commands, run:

```bash
node ace module:make <component> [--module=<module_name>]
```

Where `<component>` can be one of the following:

To see the full list you should run
```bash
node ace list module
```

### Example

To create a new controller inside a specific module:

```bash
node ace module:make-controller user --module=blog
```

If you have already set `blog` as the default module, you can simply run:

```bash
node ace module:make-controller user
```

## Inspired by Laravel Modules

This package is inspired by the [Laravel Modules package](https://github.com/nWidart/laravel-modules), which offers a similar approach for structuring Laravel applications.

## Like the Package? Star It! ⭐

If you find this package useful, please consider giving it a star on GitHub. It helps others discover it and motivates continued development.
