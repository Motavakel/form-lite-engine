# Form Lite Engine

**Form Lite Engine** is a high-performance, declarative, and schema-driven form builder for React. Built on top of `react-hook-form` and optimized for **Ant Design (v5+)**, it enables you to build complex, dynamic forms with zero boilerplate.

[![npm version](https://img.shields.io/npm/v/form-lite-engine.svg)](https://www.npmjs.com/package/form-lite-engine)
[![License](https://img.shields.io/npm/l/form-lite-engine.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/form-lite-engine)](https://bundlephobia.com/package/form-lite-engine)

---

## Features

- **Declarative Schema:** Define your forms as simple JavaScript arrays/objects.
- **Built-in Logic (showIf):** Handle complex conditional field visibility without manual `watch()` or messy state management.
- **Performance First:** Leverages `react-hook-form` for isolated re-renders and optimal interaction latency.
- **Ant Design Integration:** Pre-configured to work seamlessly with AntD components, styles, and grid system.
- **Type Safe:** Full TypeScript support for your schemas, fields, and form data.
- **Validation Ready:** Easy integration with standard React Hook Form validation rules.


---

##  Quick Comparison

Why should you use **Form Lite Engine** instead of writing raw forms?

| Feature | Raw React Hook Form + AntD | Form Lite Engine |
| :--- | :--- | :--- |
| **Code Verbosity** | High (Lots of JSX/Controller tags) | **Low** (Pure JSON-like Schema) |
| **Conditional Logic** | Manual `watch()` and ternary logic | **Built-in** `showIf` function |
| **Maintainability** | Hard to track in large forms | **Centralized** and easy to update |
| **Learning Curve** | High (Must know RHF internals) | **Easy** (Just define a schema array) |

---

##  Installation

```bash
npm install form-lite-engine
```

## Note: 
This package requires react, react-hook-form, and antd as peer dependencies. UsageBasic ExampleDefine your schema and let the engine handle the rendering, validation, and logic.TypeScript

```bash
import { FormLiteEngine } from 'form-lite-engine';
const schema = [
  {
    name: 'username',
    label: 'Username',
    component: 'input',
    rules: { required: 'Username is required' },
  },
  {
    name: 'role',
    label: 'User Role',
    component: 'select',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
  {
    name: 'adminCode',
    label: 'Admin Special Code',
    component: 'input',
    // Logic: This field is only rendered if role is 'admin'
    showIf: (values) => values.role === 'admin',
  },
];

const MyFormPage = () => {
  const handleFinish = (values) => {
    console.log('Form Submitted:', values);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>Create User</h1>
      <FormLiteEngine onSubmit="{handleFinish}" schema="{schema}" submitButtonText="Register"/>
    </div>
  );
};

```

##  Props API

| Prop | Type | Description |
| :--- | :--- | :--- |
| `schema` | `FieldConfig[]` | **(Required)** Array of field definitions and configurations. |
| `onSubmit` | `(data: any) => void` | **(Required)** Callback function triggered on valid form submission. |
| `submitButtonText` | `string` | Custom text for the primary submit button. Default: `Submit`. |
| `defaultValues` | `object` | Initial values to populate the form fields. |
| `loading` | `boolean` | Toggles the loading state/spinner on the submit button. |

---

##  Reliability & Testing

Stability is a core priority. The engine is covered by comprehensive tests using **Vitest** and **React Testing Library**.

Current Test Suite Includes:
-  **Basic field rendering** and accessibility (A11y).
-  **Validation error** feedback.
-  **Complex dynamic visibility** (`showIf`) logic.
-  **Custom component** injection and rendering.
-  **Loading states** and submission flow.

## Development & Contribution

If you want to contribute to this project or run tests locally:

1. Clone the repository from GitHub.
2. Install dependencies: `npm install`
3. Run tests: `npm test`

---

## License
This project is licensed under the Apache License 2.0. See the LICENSE file for details.

## Author
Milad Motavakel

Developed with ❤️ to make forms easier for everyone.