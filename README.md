<div align="center">

<a href="https://gowebly.org" target="_blank"><img  alt="flexi-state logo" src="https://i.ibb.co/JjkD1b5/logonew-removebg-preview-1.png"></a>

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
To get a selected state and the corresponding actions, you can pass a (`selector`) function to the useStore hook. The selector function takes the current state as an argument and returns the specific parts of the state you want to use in your component.

```tsx
const { cat, setCat } = useStore((state) => ({ cat: state.cat, setCat: state.setCat }));
```

### Getting the Entire State
To get the entire state and all the actions, you can call the store hook youve created without passing a (`selector`) function.

```tsx
const { cat, setCat} = useStore();
```



