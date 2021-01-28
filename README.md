# Simple IoC Container 

&nbsp;

## How it works
A default `Container` instance named `container` is exported by the library.

A new container can also be instantiated as below:
```ts
const cnt: Container = new Container();
```

## Binding

Calling the `container.bind(ClassName)` method will attempt to bind and construct the requested instance with its dependencies through `container.register(Person, new Person())`

&nbsp;
  
## Instances
A class instance can be registered with the `container.register` method:

```ts
container.registerInstance(Person, sampleClassInstance)
```
The first argument of  can either be a class constructor or a string.

&nbsp;

## Tests:
```bash
# Unit and feature tests can be executed by running:
npm run test 

# watch:
npm run test:watch

# Start
npm start

# development (ts-node-dev)
npm run dev
```

