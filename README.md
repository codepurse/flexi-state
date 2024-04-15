<div align="center">

<a href="https://gowebly.org" target="_blank"><img width = "350px" alt="flexi-state logo" src="https://i.ibb.co/JjkD1b5/logonew-removebg-preview-1.png"></a>

<a name="readme-top"></a>

A nimble state manager for React. Effortlessly handle complex state, customize middleware on the fly, and bid farewell to boilerplate. Enjoy flexibility without compromise.

</div>

## Features

* 🔐 **Lightweight** - Minimal performance impact with a focus on efficiency
* ⚡ **Flexible State**. Easily handle and manipulate complex state structures.
* 🌎 **Middleware**. Seamlessly incorporate custom logic for actions, logging, and more.
* 🎨 **Adaptable**. Tailor FlexiState to suit the unique needs of your projec.
* 🗂️ **Efficient Performance**. Maintains speed and responsiveness, even in demanding scenarios.
* 🏷️ **Easy to Use**. Intuitive API and declarative approach for straightforward state management.
* 👌 **Customizable**. Customize middleware and configuration to match your project requirements.
* 🚀 **Boilerplate-Free**. Enjoy a streamlined state management experience, reducing repetitive code.


## Getting started

### Installing 

You must also install `react` for flexi-state to work.

```bash
# Using npm
npm install flexi-state
# Using yarn
yarn add flexi-state
```

### Basic Store

```tsx
import { createStore } from "./createStore";

export const useStore = createStore(() => ({
  cat: 3,
  dog: 5,
  setCat: (val) => (state) => ({ cat: state.cat + val }),
  setDog: (val) => () => ({ dog: val }),
}));

```

## Usage

### Getting a Selected State
To get a selected state and the corresponding actions, you can pass a `selector` function to the useStore hook. The selector function takes the current state as an argument and returns the specific parts of the state you want to use in your component.

```tsx
const { cat, setCat } = useStore((state) => ({ cat: state.cat, setCat: state.setCat }));
```

### Getting the Entire State
To get the entire state and all the actions, you can call the store hook youve created without passing a `selector` function.

```tsx
const { cat, setCat} = useStore();
```
### Shallowing
Flexi-state checks if the state you're interested in has changed by comparing its current value with the new one. It does this quickly without checking every detail of the state. This makes sure your components only update when they really need to, making your app faster.

## Middleware
The `createStore` function in your state management implementation supports the use of middleware. Middleware allows you to extend the functionality of your state management system by intercepting and modifying the `getState`, `setState`, `subscribe`, and `actions` operations.
To use middleware, you simply need to pass an array of middleware functions to the `createStore` function.

```tsx
export const useStore = createStore(initializeStore, [middleware1, middleware2, ...]);
```
Feel free to utilize any of the middleware already available in the middleware folder of this repository. I purposely didn't include them directly in the package so you can easily modify them according to your needs.

 Middleware                                                                                | Description                                         |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `preserve`                                                                               | It saves state between sessions.                    |
| `broadcast`                                                                              | Share state between multiple tabs.                  |
| `logging`                                                                                | A simple logging middleware.                        |


## Options
The `createStore` function accepts an optional options object as its third parameter. This object allows you to customize the behavior of the state management system

```tsx
export const useStore = createStore(initializeStore, [middleware1, middleware2, ...]);
```

- `onPreStateChange` : A function that is called before the state is updated. It receives the current state and the new state as arguments, and can return a modified new state.
- `onPostStateChange` : A function that is called after the state has been updated. It receives the updated state as an argument.

```jsx
import { createStore } from "./createStore";

const storeOptions = {
  onPreStateChange: (_, newState) => {
    if (newState.cat === 5) {
      return { cat: 10 }; // can edit directly the state 
    }
  },
  onPostStateChange: (newState) => {},
};

export const useStore = createStore(
  () => ({
    cat: 3,
    dog: 5,
    setCat: (val) => (state) => ({ cat: state.cat + val }),
    setDog: (val) => (state) => ({ dog: state.dog + val }),
  }),
  [
    /* middleware here */
  ],
  storeOptions
);

```
## Immer compability
The `createStore` function is designed to work with the Immer library, which allows for easy handling of nested state updates.

```jsx
import { createStore } from "@codepurse/lite-state";
import { produce } from "immer";

export const useStore = createStore(() => ({
  cat: {
    cat1: {
      cat2: {
        cat3: 1,
      },
    },
  },
  setCat: (val) =>
    produce((state) => {
      state.cat.cat1.cat2.cat3 += val;
    }),
}));

```

