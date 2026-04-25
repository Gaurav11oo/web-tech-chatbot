/**
 * Seed Script
 * Populates the MongoDB knowledge base with web technology Q&A pairs.
 * Run: node utils/seed.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Knowledge = require("../models/Knowledge");

const seedData = [
  // ─── React ───────────────────────────────────────────────────────────────
  {
    question: "What is React and why is it used?",
    answer:
      "React is an open-source JavaScript library developed by Facebook for building fast and interactive user interfaces. It follows a component-based architecture, where the UI is split into reusable pieces called components. React uses a Virtual DOM to efficiently update only the parts of the page that change, making it extremely fast. For example, a button component can be built once and reused across the entire app. React is widely used in production by companies like Facebook, Instagram, and Airbnb.",
    keywords: ["react", "javascript", "library", "ui", "frontend", "component", "virtual", "dom"],
    category: "React",
  },
  {
    question: "What are React hooks and how do they work?",
    answer:
      "React hooks are special functions introduced in React 16.8 that let you use state and lifecycle features inside functional components without needing class components. The most common hooks are useState (to manage local state) and useEffect (to run side effects like API calls). For example: `const [count, setCount] = useState(0)` creates a state variable. Hooks must be called at the top level of a component and follow specific rules. Other popular hooks include useContext, useReducer, useMemo, and useCallback.",
    keywords: ["hooks", "usestate", "useeffect", "functional", "component", "state", "lifecycle", "react"],
    category: "React",
  },
  {
    question: "What is JSX in React?",
    answer:
      "JSX (JavaScript XML) is a syntax extension for JavaScript used in React that allows you to write HTML-like code directly inside JavaScript. It makes UI code more readable and expressive. For example: `<h1>Hello, {name}</h1>` — the curly braces let you embed any JavaScript expression. JSX is not valid JavaScript by itself; it's compiled to `React.createElement()` calls by Babel. JSX also supports attributes like `className` instead of `class`, and `htmlFor` instead of `for`, since these are reserved JavaScript keywords.",
    keywords: ["jsx", "javascript", "xml", "syntax", "babel", "html", "react", "template"],
    category: "React",
  },

  // ─── JavaScript ──────────────────────────────────────────────────────────
  {
    question: "What is a JavaScript promise?",
    answer:
      "A Promise in JavaScript represents a value that may be available now, in the future, or never — making it ideal for handling asynchronous operations. A promise has three states: pending, fulfilled, and rejected. You can chain `.then()` for success and `.catch()` for errors. Example: `fetch('/api/data').then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err))`. Promises replaced callback-heavy code (callback hell) and are the foundation of the modern async/await syntax in JavaScript.",
    keywords: ["promise", "async", "await", "then", "catch", "asynchronous", "javascript", "callback"],
    category: "JavaScript",
  },
  {
    question: "What is the difference between var, let, and const in JavaScript?",
    answer:
      "In JavaScript, `var` is function-scoped and hoisted, meaning it can be used before declaration (with value `undefined`), which often causes bugs. `let` is block-scoped and not hoisted, making it safer for variables that change. `const` is also block-scoped but cannot be reassigned after declaration, though object properties can still be mutated. For example: `const obj = {}; obj.name = 'AI'` — this works because you're mutating, not reassigning. Best practice is to use `const` by default, `let` when you need to reassign, and avoid `var` entirely.",
    keywords: ["var", "let", "const", "scope", "hoisting", "javascript", "variable", "block"],
    category: "JavaScript",
  },
  {
    question: "What are arrow functions in JavaScript?",
    answer:
      "Arrow functions are a concise syntax for writing functions introduced in ES6 (ES2015). They use the `=>` syntax and implicitly return single expressions without needing a `return` keyword. For example: `const add = (a, b) => a + b`. A key difference from regular functions is that arrow functions do NOT have their own `this` context — they inherit `this` from the enclosing scope. This makes them ideal for callbacks and event handlers where `this` binding was problematic. They cannot be used as constructors with `new`.",
    keywords: ["arrow", "function", "es6", "syntax", "this", "callback", "javascript", "lambda"],
    category: "JavaScript",
  },

  // ─── TypeScript ──────────────────────────────────────────────────────────
  {
    question: "What is TypeScript and how is it different from JavaScript?",
    answer:
      "TypeScript is a strongly-typed superset of JavaScript developed by Microsoft that compiles down to plain JavaScript. Unlike JavaScript, TypeScript adds optional static typing, interfaces, enums, and generics that help catch errors at compile time rather than runtime. For example: `function greet(name: string): string { return 'Hello ' + name; }` — this ensures only strings are passed. TypeScript works with all existing JavaScript libraries and frameworks like React, Node.js, and Express. It improves code quality, editor autocompletion, and team collaboration in large projects.",
    keywords: ["typescript", "type", "static", "interface", "compile", "javascript", "microsoft", "strongly"],
    category: "TypeScript",
  },

  // ─── CSS ─────────────────────────────────────────────────────────────────
  {
    question: "What is CSS Flexbox and how does it work?",
    answer:
      "CSS Flexbox (Flexible Box Layout) is a one-dimensional layout model that lets you align and distribute space among items in a container. By setting `display: flex` on a parent, its children become flex items. Key properties include `justify-content` (horizontal alignment), `align-items` (vertical alignment), `flex-direction` (row or column), and `flex-wrap`. Example: `display: flex; justify-content: center; align-items: center` centers content both horizontally and vertically. Flexbox is perfect for navbars, card layouts, and centering elements without hacks like `margin: auto`.",
    keywords: ["css", "flexbox", "flex", "layout", "justify", "align", "container", "responsive"],
    category: "CSS",
  },
  {
    question: "What is CSS Grid layout?",
    answer:
      "CSS Grid is a two-dimensional layout system that lets you create complex web layouts with rows and columns simultaneously. Unlike Flexbox which is one-directional, Grid controls both axes. You define a grid with `display: grid` and set columns using `grid-template-columns: repeat(3, 1fr)`. Items can span multiple rows or columns using `grid-column: 1 / 3`. Grid is ideal for full-page layouts, dashboards, and image galleries. Used together, Flexbox handles small component layouts while Grid handles macro page structures.",
    keywords: ["css", "grid", "layout", "columns", "rows", "template", "two-dimensional", "responsive"],
    category: "CSS",
  },

  // ─── HTML ─────────────────────────────────────────────────────────────────
  {
    question: "What are semantic HTML elements?",
    answer:
      "Semantic HTML elements clearly describe their meaning to both the browser and the developer. Instead of using generic `<div>` and `<span>` everywhere, semantic tags like `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>` convey the purpose of the content. For example, `<nav>` signals a navigation block, and screen readers use this information to help visually impaired users navigate. Semantic HTML improves SEO (search engines understand content better), accessibility (ARIA support), and code readability for teams. Always prefer semantic tags over non-semantic `div` wrappers.",
    keywords: ["html", "semantic", "header", "footer", "nav", "article", "section", "accessibility", "seo"],
    category: "HTML",
  },

  // ─── Node.js ─────────────────────────────────────────────────────────────
  {
    question: "What is Node.js and what is it used for?",
    answer:
      "Node.js is a runtime environment that allows JavaScript to run on the server side, outside of a browser. It is built on Chrome's V8 JavaScript engine and uses a non-blocking, event-driven I/O model, making it highly efficient for handling concurrent connections. Node.js is commonly used to build REST APIs, real-time applications (like chat apps), and command-line tools. For example, a simple HTTP server: `const http = require('http'); http.createServer((req, res) => res.end('Hello World')).listen(3000)`. Node.js uses npm (Node Package Manager) to manage thousands of open-source packages.",
    keywords: ["node", "nodejs", "server", "runtime", "javascript", "backend", "v8", "npm", "event"],
    category: "Node.js",
  },

  // ─── Express ─────────────────────────────────────────────────────────────
  {
    question: "What is Express.js and how does it work?",
    answer:
      "Express.js is a minimal and flexible Node.js web framework that provides a robust set of features to build web and mobile applications. It simplifies handling HTTP requests, routing, middleware, and responses. You define routes like: `app.get('/api/users', (req, res) => res.json(users))`. Middleware functions like `express.json()` parse incoming request bodies. Express is unopinionated, meaning you structure your app as you like. It is the most popular Node.js framework and is the 'E' in the MEAN/MERN stack, powering millions of production APIs worldwide.",
    keywords: ["express", "expressjs", "nodejs", "framework", "routing", "middleware", "rest", "api", "backend"],
    category: "Express",
  },

  // ─── MongoDB ─────────────────────────────────────────────────────────────
  {
    question: "What is MongoDB and how is it different from SQL databases?",
    answer:
      "MongoDB is a NoSQL document-oriented database that stores data in flexible, JSON-like documents called BSON (Binary JSON). Unlike SQL databases (like MySQL or PostgreSQL) which use rigid tables with rows and columns, MongoDB allows each document to have a different structure. This makes it ideal for applications where data shapes change over time. For example, a user document might be: `{ name: 'Alice', age: 25, hobbies: ['coding', 'reading'] }`. MongoDB scales horizontally easily and integrates seamlessly with JavaScript stacks (MERN). It uses Mongoose in Node.js for schema-based modeling.",
    keywords: ["mongodb", "nosql", "document", "database", "bson", "json", "mongoose", "schema", "collection"],
    category: "MongoDB",
  },

  // ─── REST API ─────────────────────────────────────────────────────────────
  {
    question: "What is a REST API?",
    answer:
      "REST (Representational State Transfer) is an architectural style for designing APIs that use HTTP methods to perform CRUD operations. The four main methods are: GET (read data), POST (create data), PUT/PATCH (update data), and DELETE (remove data). REST APIs are stateless, meaning each request contains all information needed — no session is stored on the server. A resource is accessed via a URL endpoint: `GET /api/users/1` fetches user with ID 1. RESTful APIs return data typically in JSON format and are consumed by frontend apps, mobile apps, and third-party services.",
    keywords: ["rest", "api", "http", "get", "post", "put", "delete", "endpoint", "json", "crud", "stateless"],
    category: "REST API",
  },

  // ─── Additional ───────────────────────────────────────────────────────────
  {
    question: "What is async/await in JavaScript?",
    answer:
      "Async/await is syntactic sugar over Promises that makes asynchronous JavaScript code look and behave like synchronous code, improving readability. An `async` function always returns a Promise, and `await` pauses execution until the Promise resolves. Example: `async function fetchData() { const res = await fetch('/api'); const data = await res.json(); return data; }`. Always wrap `await` calls in `try/catch` to handle errors gracefully. Async/await is now the standard way to handle asynchronous operations in modern JavaScript and works seamlessly with Node.js, Express, and Mongoose queries.",
    keywords: ["async", "await", "promise", "asynchronous", "javascript", "trycatch", "fetch", "es8", "modern"],
    category: "JavaScript",
  },
  {
    question: "What is Tailwind CSS?",
    answer:
      "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes you apply directly in your HTML/JSX to style elements, eliminating the need to write custom CSS files. Instead of writing `.button { padding: 8px 16px; background: blue; }`, you write: `<button className='px-4 py-2 bg-blue-500 text-white rounded'>Click</button>`. Tailwind is highly customizable via `tailwind.config.js` and generates only the CSS classes you actually use (tree-shaking), resulting in tiny production bundles. It's widely used with React, Next.js, and Vue for rapid, consistent UI development.",
    keywords: ["tailwind", "css", "utility", "framework", "class", "styling", "responsive", "design"],
    category: "CSS",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing knowledge data
    await Knowledge.deleteMany({});
    console.log("🗑️  Cleared existing knowledge data.");

    // Insert seed data
    const inserted = await Knowledge.insertMany(seedData);
    console.log(`✅ Successfully seeded ${inserted.length} knowledge entries.`);

    console.log("\n📚 Categories seeded:");
    const categories = [...new Set(seedData.map((d) => d.category))];
    categories.forEach((cat) => {
      const count = seedData.filter((d) => d.category === cat).length;
      console.log(`   • ${cat}: ${count} entries`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
