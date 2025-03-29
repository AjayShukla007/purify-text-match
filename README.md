# purify-text-match

[![npm version](https://img.shields.io/npm/v/purify-text-match.svg)](https://www.npmjs.com/package/purify-text-match)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!-- will uncomment this in future -->
<!-- [![npm downloads](https://img.shields.io/npm/dm/purify-text-match.svg)](https://www.npmjs.com/package/purify-text-match) -->

A lightweight and efficient package for sanitizing text and matching it against expected values. Perfect for user input validation, data normalization, and text comparison.

## Installation

```bash
npm install purify-text-match
```

or

```bash
yarn add purify-text-match
```

## Key Features

- **Text sanitization** with configurable character preservation
- **Case preservation** options (preserves case by default)
- **Space handling** options (preserves spaces by default)
- **Special character handling** for hyphens and underscores
- **Flexible string matching** with configurable strictness
- **Advanced matching** with detailed results
- **Batch processing** for multiple strings
- **Memoization** for performance optimization

## Basic Usage

```javascript
import { sanitizeString, processString, processStringAdvanced } from 'purify-text-match';

// Basic sanitization (preserves case by default)
sanitizeString('Orange-Cat!');  // Returns 'OrangeCat'

// With custom options
sanitizeString('Orange-Cat!', { 
  preserveHyphens: true 
});  // Returns 'Orange-Cat'

// Process and match against allowed values
processString('red-apple', ['red-apple', 'green-apple']);  // Returns 'redapple'

// Non-strict matching (more lenient)
processString('Red-Apple', ['red apple'], { 
  strictMatching: false 
});  // Returns 'RedApple'

// Advanced processing with detailed match information
const result = processStringAdvanced('orange-CAT', ['ORANGECAT'], { 
  strictMatching: false 
});
console.log(result);
// {
//   sanitized: 'orangeCAT',
//   matched: true,
//   original: 'orange-CAT',
//   matchedWith: 'orangecat'
// }
```

## Default Behavior

By default, the package:
- **Preserves case** - `orange-cat` → `orangecat` (case maintained)
- **Preserves spaces** - `orange cat` → `orange cat` (spaces maintained)
- **Removes hyphens** - `orange-cat` → `orangecat` (hyphens removed)
- **Removes underscores** - `orange_cat` → `orangecat` (underscores removed)
- **Removes special characters** - `or@nge&cat!` → `orangecat` (special chars removed)

## API Reference

### Core Functions

#### `sanitizeString(input, options?)`

Sanitizes a string according to the specified options.

```javascript
import { sanitizeString } from 'purify-text-match';

// Default behavior
sanitizeString('Orange-Cat!');  // Returns 'OrangeCat'

// Custom options
sanitizeString('Orange-Cat!', {
  preserveHyphens: true,
  convertToUpperCase: true
});  // Returns 'ORANGE-CAT'
```

**Options:**

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `preserveCase` | boolean | `true` | Maintains original case |
| `preserveSpaces` | boolean | `true` | Keeps spaces |
| `preserveHyphens` | boolean | `false` | Keeps hyphens |
| `preserveUnderscores` | boolean | `false` | Keeps underscores |
| `convertToUpperCase` | boolean | `false` | Converts to uppercase |
| `removeSpecialChars` | boolean | `true` | Removes special characters |
| `removeWhitespace` | boolean | `false` | Removes all whitespace |
| `preserveNumbers` | boolean | `true` | Keeps numeric digits |
| `trimEdges` | boolean | `true` | Trims whitespace at start/end |

#### `processString(input, matchArray?, options?)`

Processes a string and optionally checks if it matches any entry in the provided array.

```javascript
import { processString } from 'purify-text-match';

// Sanitize only (no matching)
processString('Orange-Cat!');  // Returns 'OrangeCat'

// Match against allowed values
try {
  processString('orange-cat', ['orange-cat', 'black-cat']);  // Returns 'orangecat'
  processString('yellow-cat', ['orange-cat', 'black-cat']);  // Throws error
} catch (error) {
  console.error(error.message);  // "No match found in the provided array."
}

// Non-strict matching with custom options
processString('Orange-Cat!', ['orange cat'], {
  strictMatching: false,
  throwOnNoMatch: false,  // Return null instead of throwing error
  preserveHyphens: true   // Keep hyphens in output
});
```

**Options:** All options from `sanitizeString()`, plus:

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `strictMatching` | boolean | `true` | Requires exact match when true |
| `throwOnNoMatch` | boolean | `true` | Throws error when no match and true |
| `errorMessage` | string | `'No match found in the provided array.'` | Custom error message |

#### `processStringAdvanced(input, matchArray?, options?)`

Returns detailed information about the sanitization and match process.

```javascript
import { processStringAdvanced } from 'purify-text-match';

const result = processStringAdvanced('Orange-Cat!', ['orange cat'], {
  strictMatching: false,
  preserveHyphens: true
});

console.log(result);
// {
//   sanitized: 'Orange-Cat',   // Sanitized string with hyphens preserved
//   matched: true,             // Whether it matched an entry
//   original: 'Orange-Cat!',   // Original input
//   matchedWith: 'orange cat'  // The matched entry from the array
// }
```

#### `batchProcess(inputs, matchArray?, options?)`

Process multiple strings at once.

```javascript
import { batchProcess } from 'purify-text-match';

const inputs = ['orange-cat', 'black-cat', 'yellow-cat'];
const allowed = ['orange-cat', 'black-cat'];

const results = batchProcess(inputs, allowed, {
  throwOnNoMatch: false,
  preserveHyphens: true
});
// ['orange-cat', 'black-cat', null]
```

#### `batchProcessAdvanced(inputs, matchArray?, options?)`

Process multiple strings with detailed results.

```javascript
import { batchProcessAdvanced } from 'purify-text-match';

const inputs = ['orange-cat', 'black-cat', 'yellow-cat'];
const allowed = ['orange-cat', 'black-cat'];

const results = batchProcessAdvanced(inputs, allowed, {
  strictMatching: false,
  preserveHyphens: true
});
// Array of detailed result objects for each input
```

## Examples

### Customizing Character Preservation

```javascript
import { sanitizeString } from 'purify-text-match';

// Default behavior - remove hyphens and underscores
sanitizeString('orange-cat_toy');  // 'orangecattoy'

// Preserve hyphens only
sanitizeString('orange-cat_toy', {
  preserveHyphens: true
});  // 'orange-cattoy'

// Preserve underscores only
sanitizeString('orange-cat_toy', {
  preserveUnderscores: true
});  // 'orangecat_toy'

// Preserve both hyphens and underscores
sanitizeString('orange-cat_toy', {
  preserveHyphens: true,
  preserveUnderscores: true
});  // 'orange-cat_toy'
```

### Case Handling

```javascript
import { sanitizeString } from 'purify-text-match';

// Default behavior - preserve original case
sanitizeString('Orange-CAT');  // 'OrangeCAT'

// Convert to uppercase
sanitizeString('Orange-CAT', {
  preserveCase: false,
  convertToUpperCase: true
});  // 'ORANGECAT'

// Convert to lowercase
sanitizeString('Orange-CAT', {
  preserveCase: false,
  convertToUpperCase: false
}).toLowerCase();  // 'orangecat'
```

### Space Handling

```javascript
import { sanitizeString } from 'purify-text-match';

// Default behavior - preserve spaces
sanitizeString('orange cat toy');  // 'orange cat toy'

// Remove spaces
sanitizeString('orange cat toy', {
  preserveSpaces: false
});  // 'orangecattoy'

// Alternative way to remove spaces
sanitizeString('orange cat toy', {
  removeWhitespace: true
});  // 'orangecattoy'
```

### Advanced Matching Examples

```javascript
import { processStringAdvanced } from 'purify-text-match';

// Exact matching with case sensitivity (strict mode)
processStringAdvanced('Orange-Cat', ['orange-cat'], {
  strictMatching: true
});
// { matched: false, sanitized: 'OrangeCat', original: 'Orange-Cat' }

// Non-strict matching (ignores case for comparison)
processStringAdvanced('Orange-Cat', ['orange-cat'], {
  strictMatching: false
});
// { matched: true, sanitized: 'OrangeCat', original: 'Orange-Cat', matchedWith: 'orangecat' }

// Input validation with preserved formatting
processStringAdvanced('Product-ID123', ['product-id123'], {
  strictMatching: false,
  preserveCase: true,
  preserveHyphens: true
});
// { matched: true, sanitized: 'Product-ID123', original: 'Product-ID123', matchedWith: 'product-id123' }
```

## Compatibility

`purify-text-match` is designed to work seamlessly across virtually all JavaScript environments:

### Server-side
- Node.js (v14.0.0+)
- Express.js applications
- NestJS applications
- Serverless Functions (AWS Lambda, Vercel, Netlify, etc.)
- Deno (with ESM imports)
- Bun runtime

### Frontend Frameworks
- React
- Next.js (server & client components)
- Vue.js
- Angular
- Svelte/SvelteKit
- Solid.js
- Remix
- Gatsby

### Mobile Development
- React Native
- Ionic Framework
- Capacitor
- NativeScript

### Build System Compatibility
- Webpack
- Rollup
- esbuild
- Vite
- Parcel

The package contains pure JavaScript utilities with zero dependencies, making it highly portable across any JavaScript runtime.

## About


<details>
  <summary><strong>How to Contribute</strong></summary>

1. **Fork the repository** on GitHub  
2. **Clone** your fork locally:  
   ```bash
   git clone https://github.com/AjayShukla007/purify-text-match.git
   ```
3. **Create a branch** for your feature:  
   ```bash
   git checkout -b feature/amazing-improvement
   ```
4. **Make your changes** and commit them with clear messages
5. **Run tests** to ensure everything works:  
   ```bash
   npm test
   ```
6. **Push** to your branch:  
   ```bash
   git push origin feature/amazing-improvement
   ```
7. **Open a Pull Request** from your fork to the main repository

</details>

<details>
  <summary><strong>Code Guidelines</strong></summary>

- Maintain 100% test coverage for new features and add necessary tests
- Follow the existing code style and TypeScript conventions  
- Document new functions with JSDoc comments  
- Update relevant documentation  

We appreciate your contributions and will review pull requests promptly.

</details>

<!-- # Reporting Issues -->

<details>
  <summary><strong>For Bug Reports</strong></summary>

Please include the following details:

- A clear, descriptive title  
- Steps to reproduce the issue  
- Expected behavior vs. actual behavior  
- Environment details:
  - Node.js version  
  - Enviroment
  - Frameworks name if applicable
  - Package version  
  - Operating system  
- Any error messages or console output  

</details>

<details>
  <summary><strong>For Feature Requests</strong></summary>

Please include:

- A clear description of the feature  
- The use case that would benefit from this feature  
- Any implementation ideas you might have  

We value your feedback and will address issues as quickly as possible.

</details>

<!-- # Running Tests -->

<details>
  <summary><strong>How to Run Tests</strong></summary>

Run tests using:

```bash
npm test
```

Ensure that all tests pass before submitting any pull requests or publishing a new version.

</details>

---


## Author
**Ajay Shukla**
- [Portfolio](https://ajayshukla.vercel.app/projects)
- [GitHub Profile](https://github.com/AjayShukla007)
- [LinkedIn Profile](http://www.linkedin.com/in/ajay-shukla-803308212)

## Copyright

Copyright © 2025 Ajay Shukla. Released under the MIT LICENSE.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.