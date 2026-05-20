import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Moon, Sun, Download, RefreshCw, ChevronDown, ChevronRight, 
  Menu, X, Star, FileText, CheckCircle, BrainCircuit, Code, Bug, 
  Layers, Database, Globe, Shield, UserPlus, Trash2, Users, Edit3, Award, FileSpreadsheet
} from 'lucide-react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Local storage read error: ", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Local storage write error: ", error);
    }
  };

  return [storedValue, setValue];
}

const CATEGORIES = [
  { id: 'dashboard', name: 'Dashboard', icon: <Layers className="w-5 h-5" /> },
  { id: 'fundamentals', name: 'Programming Fundamentals', icon: <Code className="w-5 h-5" /> },
  { id: 'problem_solving', name: 'Problem Solving Thinking', icon: <BrainCircuit className="w-5 h-5" /> },
  { id: 'debugging', name: 'Debugging Knowledge', icon: <Bug className="w-5 h-5" /> },
  { id: 'data_structures', name: 'Data Structures', icon: <Layers className="w-5 h-5" /> },
  { id: 'algorithms', name: 'Algorithms', icon: <RefreshCw className="w-5 h-5" /> },
  { id: 'oop', name: 'OOP Concepts', icon: <FileText className="w-5 h-5" /> },
  { id: 'database', name: 'Database / SQL', icon: <Database className="w-5 h-5" /> },
  { id: 'api_backend', name: 'API / Backend', icon: <Globe className="w-5 h-5" /> },
  { id: 'security', name: 'Web Security Concepts', icon: <Shield className="w-5 h-5" /> },
];

const QUESTION_BANK = {
  fundamentals: [
    {
      id: 'f1', difficulty: 'Basic',
      question: "What is the difference between 'let', 'const', and 'var'?",
      answer: "var is old, function-scoped, and gets hoisted. let and const are block-scoped (they live only inside the {} curly brackets where they are created). const cannot be reassigned after you give it a value, while let can be changed.",
      example: "Use const for values that stay the same (like an API URL); use let for variables that change (like a loop counter)."
    },
    {
      id: 'f2', difficulty: 'Basic',
      question: "What is a Ternary Operator and how do you write it?",
      answer: "A Ternary Operator is a short way to write a simple if/else statement in a single line. It uses a question mark (?) and a colon (:). Syntax: condition ? expressionIfTrue : expressionIfFalse.",
      example: "const status = isPaid ? 'Invoice Paid' : 'Pending Payment';"
    },
    {
      id: 'f3', difficulty: 'Basic',
      question: "What is the purpose of an 'if/else' condition block?",
      answer: "An if/else statement controls the flow of your program. It lets your code make decisions by executing one block of code if a condition is true, and a different block of code if it is false.",
      example: "If a user has logged in, show the Dashboard; else, show the Login Page."
    },
    {
      id: 'f4', difficulty: 'Basic',
      question: "What is the difference between a 'for' loop and a 'while' loop?",
      answer: "A 'for' loop is best when you know exactly how many times you want to repeat code (like looping 10 times). A 'while' loop is best when you want to keep repeating code until a certain condition changes, and you don't know exactly when that will happen.",
      example: "Use a 'for' loop to print numbers 1 to 5. Use a 'while' loop to keep asking a user for their password until they type it correctly."
    },
    {
      id: 'f5', difficulty: 'Basic',
      question: "What does the 'return' keyword do inside a function?",
      answer: "The 'return' keyword stops the execution of a function and sends a value back to the place where the function was called. If you don't write 'return', the function will finish and return 'undefined' by default.",
      example: "function double(num) { return num * 2; } // calling double(5) gives you back 10."
    },
    {
      id: 'f6', difficulty: 'Basic',
      question: "What is the difference between Function Parameters and Function Arguments?",
      answer: "Parameters are the placeholder names listed in the function's definition. Arguments are the real, actual values you pass into the function when you run (call) it.",
      example: "In 'function greet(name) {}', 'name' is a parameter. When you run 'greet(\"Channy\")', '\"Channy\"' is the argument."
    },
    {
      id: 'f7', difficulty: 'Intermediate',
      question: "What is a Callback Function?",
      answer: "A callback function is a function that you pass as an argument into another function. This allows the outer function to run the callback function later when a specific action finishes.",
      example: "Passing a function to alert user 'Payment Successful!' inside a setTimeout delay function."
    },
    {
      id: 'f8', difficulty: 'Basic',
      question: "Explain the difference between Synchronous and Asynchronous programming.",
      answer: "Synchronous programming executes code line-by-line in order. Each line must wait for the previous line to finish before running. Asynchronous programming allows long tasks (like loading data from a server) to run in the background so your program can do other things instead of freezing.",
      example: "Synchronous: Waiting in a physical queue at an ABA ATM. Asynchronous: Ordering food on Nham24; you can clean your room while waiting, and you eat only when the delivery rider arrives."
    },
    {
      id: 'f9', difficulty: 'Intermediate',
      question: "What are 'async' and 'await' in JavaScript?",
      answer: "They are keywords used to write asynchronous code that looks and behaves like synchronous code. 'async' marks a function as asynchronous, and 'await' pauses the execution of the function until a Promise is resolved (finished).",
      example: "const response = await fetch('https://api.example.com/data');"
    },
    {
      id: 'f10', difficulty: 'Basic',
      question: "What is an Arrow Function, and how does it look?",
      answer: "An arrow function is a shorter, modern syntax for writing functions using the '=>' operator. It is cleaner than using the traditional 'function' keyword.",
      example: "Traditional: 'function add(a, b) { return a + b; }' vs Arrow: 'const add = (a, b) => a + b;'"
    },
    {
      id: 'f11', difficulty: 'Basic',
      question: "What is the difference between strict equality === and loose equality ==?",
      answer: "== (loose equality) compares only values and converts types automatically (type coercion). === (strict equality) compares both values AND types, returning true only if they are exactly identical.",
      example: "5 == '5' is true (coerces string to number). 5 === '5' is false (because one is a number, and one is a string)."
    },
    {
      id: 'f12', difficulty: 'Basic',
      question: "What do the logical operators && (AND) and || (OR) do?",
      answer: "&& returns true only if both sides are true. || returns true if at least one of the sides is true.",
      example: "isMember && hasCoupon (requires both). hasCash || hasAbapay (requires at least one payment method)."
    },
    {
      id: 'f13', difficulty: 'Intermediate',
      question: "What is the difference between Array .forEach() and .map()?",
      answer: "Both loop through every item in an array. However, .forEach() just runs code for each item but returns nothing, while .map() creates and returns a brand new array filled with the results of your calculations.",
      example: "Use .forEach() to log every user name. Use .map() to double all prices in a products array."
    },
    {
      id: 'f14', difficulty: 'Basic',
      question: "What are Template Literals (backtick strings) and why are they useful?",
      answer: "Template literals use backticks (`` ` ``) instead of normal quotes. They let you easily embed variables directly into strings using ${variableName} and write multi-line strings without breaking.",
      example: "const greeting = `Hello ${userName}, welcome back!`;"
    },
    {
      id: 'f15', difficulty: 'Basic',
      question: "What is the difference between null and undefined?",
      answer: "undefined means a variable has been declared but has not been given a value yet. null is an assigned value that explicitly represents 'nothing' or an empty object.",
      example: "let userEmail; // undefined. let cartItem = null; // empty on purpose."
    },
    // New Frontend-Focused Questions
    {
      id: 'f16', difficulty: 'Basic',
      question: "What is a React Component?",
      answer: "A component is a small, reusable building block of UI code. It is basically a function that returns HTML/JSX, allowing you to split your interface into independent, isolated, and reusable pieces.",
      example: "Creating a 'Button' component that you can reuse everywhere on your website."
    },
    {
      id: 'f17', difficulty: 'Intermediate',
      question: "What is 'State' in React and why do we use it?",
      answer: "State is a built-in object that stores data that changes over time within a component. When state updates, the component re-renders to show the new data to the user.",
      example: "A shopping cart counter that updates from 0 to 1 when a user clicks 'Add to Cart'."
    },
    {
      id: 'f18', difficulty: 'Intermediate',
      question: "What is the difference between a Stateful and Stateless component?",
      answer: "Stateful components track internal data (state) and can change based on user interactions. Stateless components (often functional components without hooks) just receive props and return UI without needing to remember any information.",
      example: "A simple 'Header' text is stateless; a 'Login Form' is stateful because it remembers what the user typed."
    },
    {
      id: 'f19', difficulty: 'Basic',
      question: "What is Object/Array Destructuring in JavaScript?",
      answer: "Destructuring is a shortcut syntax that allows you to extract values from arrays or properties from objects and assign them to individual variables in one single line.",
      example: "const { name, age } = user; // instead of const name = user.name;"
    },
    {
      id: 'f20', difficulty: 'Basic',
      question: "What are 'Props' in React?",
      answer: "Props (short for properties) are how information is passed from a parent component to a child component. They are read-only, meaning a child component cannot change the props it receives.",
      example: "Passing a user's name from App.js to a Welcome.js component."
    },
    {
      id: 'f21', difficulty: 'Intermediate',
      question: "Explain what 'Conditional Rendering' is in React.",
      answer: "It is the process of showing different UI elements based on certain conditions (e.g., if a user is logged in, show 'Logout', otherwise show 'Login'). You usually use operators like && or ternary operators inside your JSX.",
      example: "isLoggedIn ? <LogoutButton /> : <LoginButton />"
    },
    {
      id: 'f22', difficulty: 'Intermediate',
      question: "What is a controlled component?",
      answer: "A controlled component is an input field (like a text box) where the value is controlled by React state. Every time the user types, it updates the state, and the state re-updates the input value.",
      example: "A login input field where the value is stored in React state instead of relying on the DOM."
    },
    {
      id: 'f23', difficulty: 'Intermediate',
      question: "What does the 'map()' function typically do when rendering UI?",
      answer: "It is used to loop through an array of data and convert each item into a React component or HTML block, essentially rendering a dynamic list of items.",
      example: "items.map(item => <li key={item.id}>{item.name}</li>)"
    },
    {
      id: 'f24', difficulty: 'Intermediate',
      question: "What is the purpose of the 'key' prop when rendering a list?",
      answer: "The 'key' prop helps React identify which items have changed, been added, or been removed. It is crucial for performance and bug-free rendering of lists.",
      example: "Using unique product IDs as keys in a product list."
    },
    {
      id: 'f25', difficulty: 'Advanced',
      question: "What are React Hooks (like useState/useEffect)?",
      answer: "Hooks are special functions that let you 'hook into' React features. useState lets you manage state in functional components, and useEffect lets you perform side effects (like fetching data) after the component renders.",
      example: "useEffect(() => { fetchData(); }, []) // Fetches data when component mounts."
    }
  ],
  problem_solving: [
    {
      id: 'ps1', difficulty: 'Basic',
      question: "How would you handle a situation where you strongly disagree with a colleague on how to approach a technical problem?",
      answer: "I would first listen to their perspective without interrupting, then clearly explain my reasoning using facts and data rather than emotions. If we still can't agree, I'd suggest we prototype both ideas or ask a senior team member for an objective opinion.",
      example: "Organizing a short meeting to whiteboard both approaches and compare the pros and cons logically."
    },
    {
      id: 'ps2', difficulty: 'Intermediate',
      question: "Describe a time you were assigned a highly complex task that you didn't immediately know how to solve.",
      answer: "I break the complex task down into smaller, manageable pieces. I research the unknowns, read documentation, and if I am stuck for more than a reasonable amount of time (e.g., an hour), I ask for guidance from a senior developer.",
      example: "Creating a step-by-step checklist of smaller tasks and knocking them out one by one."
    },
    {
      id: 'ps3', difficulty: 'Intermediate',
      question: "What do you do if you realize you are going to miss a critical project deadline?",
      answer: "I communicate the delay to my manager and stakeholders as early as possible. I explain the blockers, propose a revised timeline, and offer a solution, such as reducing the scope of the feature to meet the original deadline.",
      example: "Sending a status update identifying the roadblock and providing two alternative options to move forward."
    },
    {
      id: 'ps4', difficulty: 'Advanced',
      question: "How do you handle a situation where a colleague takes credit for your work or your idea?",
      answer: "I would assume positive intent first—maybe it was an oversight. I would clarify my contribution in a group setting politely, or pull the colleague aside later to discuss how we can better share credit in the future.",
      example: "Saying in a meeting, 'Adding to what John said about the architecture, when I designed that module, I also ensured it was scalable.'"
    },
    {
      id: 'ps5', difficulty: 'Intermediate',
      question: "How would you approach a situation where a team member is consistently underperforming or missing their deadlines, affecting your work?",
      answer: "I would first talk to them privately to see if they are facing any personal or technical blockers and offer help. If the issue persists and heavily impacts the project, I would objectively raise the concern with a manager.",
      example: "Offering to pair-program with a colleague who seems to be struggling with a new framework."
    },
    {
      id: 'ps6', difficulty: 'Intermediate',
      question: "How do you handle a situation where you believe your manager's technical decision is wrong or harmful to the project?",
      answer: "I would approach my manager privately and respectfully share my concerns. I would provide data or documentation to support my alternative solution. Ultimately, if they stick to their decision, I will fully support it and do my best to execute it.",
      example: "Presenting a quick proof-of-concept to show why an alternative database structure might perform better."
    },
    {
      id: 'ps7', difficulty: 'Advanced',
      question: "Describe a time when a project you were working on failed or faced a major setback. How did you handle it?",
      answer: "I take ownership of my part in the failure without pointing fingers. I focus on conducting a post-mortem to analyze what went wrong, what we learned, and how to prevent it in the future.",
      example: "Creating a blameless post-mortem document after a production crash to identify structural gaps in our deployment process."
    },
    {
      id: 'ps8', difficulty: 'Intermediate',
      question: "How do you navigate communication breakdowns across different departments (e.g., between engineering and design/marketing)?",
      answer: "I proactively schedule a sync meeting to align both teams on the shared goal. I avoid technical jargon when speaking to non-technical teams and seek to understand their priorities and constraints.",
      example: "Setting up a weekly 15-minute standup between frontend developers and UX designers to clarify UI expectations."
    },
    {
      id: 'ps9', difficulty: 'Basic',
      question: "How do you handle receiving harsh or negative feedback during a code review or performance evaluation?",
      answer: "I detach my ego from my work and treat the feedback as a learning opportunity. I ask clarifying questions if I don't understand the critique, and I implement the requested changes without taking it personally.",
      example: "Thanking the reviewer for catching a memory leak and asking for a resource to learn more about the best practice."
    },
    {
      id: 'ps10', difficulty: 'Intermediate',
      question: "How do you proceed when the project requirements given to you are highly ambiguous or constantly changing?",
      answer: "I pause development and schedule a meeting with stakeholders to clarify the goals. I write down the agreed-upon requirements, get sign-off, and suggest an Agile approach so changes can be managed in sprints.",
      example: "Creating a written document outlining the exact features to be built and getting the product manager's approval."
    },
    {
      id: 'ps11', difficulty: 'Intermediate',
      question: "How do you prioritize your work when you have multiple high-priority tasks due at the same time and limited resources?",
      answer: "I use an urgency vs. importance matrix. I communicate with my manager to align on what delivers the most business value first. If everything is truly critical, I ask for help or see if deadlines can be negotiated.",
      example: "Reaching out to a project manager to clarify which of the three 'urgent' bugs is affecting the most users."
    },
    {
      id: 'ps12', difficulty: 'Advanced',
      question: "What do you do when you are dependent on another team for a feature, but they are blocking your progress?",
      answer: "I communicate the blocker early to my manager and the dependent team. While waiting, I mock the dependency so I can continue working on my part of the feature. I check in regularly without being confrontational.",
      example: "Mocking an API response locally while waiting for the backend team to deploy the actual endpoint."
    },
    {
      id: 'ps13', difficulty: 'Advanced',
      question: "How do you handle a toxic or uncooperative team member who disrupts the team's morale?",
      answer: "I try to maintain a professional and empathetic relationship, focusing on the work. I set clear boundaries and document our interactions. If the behavior escalates and impacts project delivery, I escalate the issue to HR or management.",
      example: "Keeping all project-related communication in public Slack channels or Jira tickets to ensure transparency."
    },
    {
      id: 'ps14', difficulty: 'Intermediate',
      question: "How do you ensure knowledge transfer when a key member of the project team leaves abruptly?",
      answer: "I quickly identify the most critical systems they managed. I arrange immediate handover sessions to document processes, credentials, and undocumented features. I ensure the rest of the team cross-trains on these areas.",
      example: "Recording a screen-share session with the departing employee explaining the deployment pipeline."
    },
    {
      id: 'ps15', difficulty: 'Advanced',
      question: "Describe a situation where you had to compromise on code quality to meet a tight business deadline. How did you manage it?",
      answer: "I clearly communicate the trade-offs to stakeholders, explaining that we are taking on technical debt. I ensure the code is still functional and secure, but immediately create a Jira ticket to refactor the code in the next sprint.",
      example: "Writing a quick script to bypass a slow data migration, but scheduling time next week to build a proper pipeline."
    }
  ],
  debugging: [
    {
      id: 'db1', difficulty: 'Basic',
      question: "What is the difference between syntax, runtime, and logical errors?",
      answer: "Syntax errors violate the compiler/interpreter grammar rules (code won't compile). Runtime errors happen during execution when an illegal operation is triggered. Logical errors are mistakes where code runs but produces incorrect outputs.",
      example: "Missing parenthesis (Syntax); dividing by 0 or calling undef (Runtime); writing x + y instead of x - y (Logical)."
    },
    {
      id: 'db2', difficulty: 'Basic',
      question: "What is your step-by-step troubleshooting workflow?",
      answer: "1. Consistently reproduce the failure. 2. Isolate context state to find the exact line/action. 3. Read variable values via debugging inspect points. 4. Devise a targeted fix. 5. Verify the fix and write tests to prevent future regressions.",
      example: "Using console output traces or debug breakpoints to track variable states over time."
    },
    {
      id: 'db3', difficulty: 'Intermediate',
      question: "What is a Stack Trace, and how do you analyze it?",
      answer: "A stack trace is an ordered log showing the active execution frames at the exact moment an error was thrown. You read it from the top down to identify the error type, exact source line, and execution path.",
      example: "Reading: 'TypeError: undefined is not an object' at main.js line 42, called from layout.js line 15."
    },
    {
      id: 'db4', difficulty: 'Advanced',
      question: "How do you trace and fix memory leaks in web applications?",
      answer: "Use browser performance profile memory allocations. Take heap snapshots to compare object counts before and after workflows. Check for unremoved global variables, forgotten timers, and uncleaned event listeners.",
      example: "Cleaning up intervals by running clearInterval() inside a component unmount handler."
    },
    {
      id: 'db5', difficulty: 'Intermediate',
      question: "What are Source Maps and why are they vital for frontend debugging?",
      answer: "Source maps map compiled, minified production bundle code back to its original raw source scripts. This allows developers to debug readable code directly inside production web consoles without exposing raw files.",
      example: "Reading real variable names and line errors in Chrome DevTools instead of an unreadable single-line minified main.bundle.js."
    },
    {
      id: 'db6', difficulty: 'Basic',
      question: "What is 'Rubber Duck Debugging'?",
      answer: "It's the process of explaining your code line-by-line to a physical object (or peer) in plain spoken language. In explaining how code *should* work, you often notice mismatches with how it actually works.",
      example: "Realizing you skipped setting a state variable while explaining a data loading flow out loud."
    },
    {
      id: 'db7', difficulty: 'Advanced',
      question: "How do you identify and fix asynchronous race conditions?",
      answer: "Race conditions happen when output depends on the order of asynchronous completions. Fix this by discarding old response streams, using unique request IDs, cancelling stale fetch queries, or using lock patterns.",
      example: "Adding an abort controller to discard API requests if a user clicks a different filter while a query is loading."
    },
    {
      id: 'db8', difficulty: 'Intermediate',
      question: "What is a 'Heisenbug'?",
      answer: "A Heisenbug is a programming error that seems to disappear or change its behavior when you try to study it, debug it, or output values to analyze it.",
      example: "A bug caused by race conditions or memory alignment that changes behavior when console.logs slow down execution."
    },
    {
      id: 'db9', difficulty: 'Intermediate',
      question: "How do you catch and handle unhandled promise rejections?",
      answer: "By consistently attaching a .catch() block or using try-catch blocks within async operations. Locally, you can register global event listeners like 'unhandledrejection' to catch any missed errors.",
      example: "window.addEventListener('unhandledrejection', (event) => logToSentry(event.reason));"
    },
    {
      id: 'db10', difficulty: 'Basic',
      question: "What is the difference between console.log and using debugger breakpoints?",
      answer: "console.log prints snapshots to output but allows code to keep running. Breakpoints freeze code execution at a specific line, letting you inspect local scopes, variable values, call stacks, and step through execution line by line.",
      example: "Pausing page rendering on click events to inspect the state of a variable right before a crash."
    },
    {
      id: 'db11', difficulty: 'Intermediate',
      question: "How do you debug slow page loads or UI lag on the frontend?",
      answer: "Use the browser's Network tab to check file sizes and API times, and the Performance tab to record UI interactions, analyze main thread blocking, find layout shifts, and identify expensive JS functions.",
      example: "Finding that a massive image file lacks compression and blocks page rendering."
    },
    {
      id: 'db12', difficulty: 'Basic',
      question: "What is Regression Testing?",
      answer: "Regression testing means re-running existing test cases to confirm that recent code changes, features, or bug fixes have not broken or degraded existing functionality.",
      example: "Running automated test suites after updating a third-party library."
    },
    {
      id: 'db13', difficulty: 'Intermediate',
      question: "How do you debug styling/layout issues that only happen on Safari/iOS devices?",
      answer: "Connect the mobile iOS device to a Mac using a cable, open Desktop Safari, choose the Develop menu, and select your mobile device to inspect page elements, layouts, and styles directly.",
      example: "Debugging an iOS layout bug using safari inspector tools."
    },
    {
      id: 'db14', difficulty: 'Basic',
      question: "What does it mean to do a 'Dry Run'?",
      answer: "A dry run is a mental or paper trace of an algorithm's execution flow. You track variable states step-by-step with simple values without running the code on a computer.",
      example: "Walking through a loop block using a piece of paper to trace values."
    },
    {
      id: 'db15', difficulty: 'Advanced',
      question: "How do you troubleshoot a bug that occurs in production but not locally?",
      answer: "Compare environment configurations, check database seed records, verify browser versions, mock network latency or restrictions, and review production system logs for hidden anomalies.",
      example: "Discovering that the production database enforces strict mode SQL while the local database doesn't."
    }
  ],
  data_structures: [
    {
      id: 'ds1', difficulty: 'Basic',
      question: "What is an Array?",
      answer: "An array is a list-like collection of items stored in order. It is one of the most common ways to group things.",
      example: "A shopping list of items: ['Apple', 'Orange', 'Mango']."
    },
    {
      id: 'ds2', difficulty: 'Basic',
      question: "What is an Object or Dictionary?",
      answer: "An object (or dictionary) stores data in key-value pairs. You look up items by a name (the key) instead of a position number.",
      example: "A student profile: { name: 'Sok', age: 20, city: 'Phnom Penh' }."
    },
    {
      id: 'ds3', difficulty: 'Basic',
      question: "What is a Stack?",
      answer: "A stack is a structure where you add and remove items from the same end (Last-In, First-Out).",
      example: "A stack of plates; you put the new plate on top and take the top one off first."
    },
    {
      id: 'ds4', difficulty: 'Basic',
      question: "What is a Queue?",
      answer: "A queue is like a line (First-In, First-Out). You add items to the back and take them from the front.",
      example: "People waiting in line at a bank. The first person to join the line is the first one served."
    },
    {
      id: 'ds5', difficulty: 'Intermediate',
      question: "When should you use an Array vs an Object?",
      answer: "Use an Array when you have an ordered list of items (like a list of scores). Use an Object when you need to store descriptive details about one thing (like a user's address/name/age).",
      example: "Array: [10, 20, 30]. Object: { id: 1, name: 'Sok' }."
    },
    {
      id: 'ds6', difficulty: 'Intermediate',
      question: "What is the main benefit of using a Dictionary/Object for searching?",
      answer: "Searching for something in an Object is very fast because you can go directly to the key. In an Array, you might have to check every single item one-by-one to find what you want.",
      example: "Finding a student by ID in an Object takes one step; in an Array, it could take 100 steps if the student is at the end."
    },
    {
      id: 'ds7', difficulty: 'Basic',
      question: "How do you add an item to an Array in JavaScript?",
      answer: "You use the .push() method to add an item to the end of the array.",
      example: "let list = ['A']; list.push('B'); // list is now ['A', 'B']."
    },
    {
      id: 'ds8', difficulty: 'Basic',
      question: "How do you remove the last item from an Array?",
      answer: "You use the .pop() method, which removes the last element and returns it.",
      example: "let list = ['A', 'B']; list.pop(); // returns 'B', list is now ['A']."
    },
    {
      id: 'ds9', difficulty: 'Basic',
      question: "What is the length property of an Array?",
      answer: "It tells you exactly how many items are currently inside that array.",
      example: "['Apple', 'Banana'].length // returns 2."
    },
    {
      id: 'ds10', difficulty: 'Basic',
      question: "How do you access a value inside an Object?",
      answer: "You use 'dot notation' (e.g., student.name) or 'bracket notation' (e.g., student['name']).",
      example: "const user = { name: 'Dara' }; console.log(user.name); // Dara"
    },
    {
      id: 'ds11', difficulty: 'Intermediate',
      question: "What is a Set?",
      answer: "A Set is a collection of unique items. It does not allow duplicate values.",
      example: "Storing a list of unique tags: ['tech', 'news', 'tech'] becomes {'tech', 'news'}."
    },
    {
      id: 'ds12', difficulty: 'Intermediate',
      question: "What is a 2D Array (Matrix)?",
      answer: "It is an array of arrays, useful for representing grids or tables.",
      example: "A grid for a Tic-Tac-Toe game or a table of data."
    },
    {
      id: 'ds13', difficulty: 'Basic',
      question: "How do you find if an item exists in an Array?",
      answer: "You can use the .includes() method, which returns true or false.",
      example: "['Apple', 'Mango'].includes('Apple') // true."
    },
    {
      id: 'ds14', difficulty: 'Intermediate',
      question: "What is a Linked List?",
      answer: "A linked list is a chain of nodes where each node contains data and a pointer to the next node.",
      example: "A treasure hunt where each clue leads to the next location."
    },
    {
      id: 'ds15', difficulty: 'Intermediate',
      question: "How do you get all the keys of an Object?",
      answer: "You use Object.keys(yourObject) to get an array of the keys.",
      example: "Object.keys({ name: 'Sok', age: 20 }) // returns ['name', 'age']."
    }
  ],
  algorithms: [
    {
      id: 'a1', difficulty: 'Basic',
      question: "What is an Algorithm?",
      answer: "An algorithm is just a set of step-by-step instructions to solve a problem or complete a task.",
      example: "A recipe to make standard Cambodian Fish Amok is an algorithm."
    },
    {
      id: 'a2', difficulty: 'Basic',
      question: "How do you find the biggest number in a list of transaction prices?",
      answer: "1. Assume the first number is the biggest. 2. Loop through the list. 3. If you see a bigger number, update your 'biggest' variable. 4. Return it at the end.",
      example: "Looking through [10, 50, 100, 20] to find 100."
    },
    {
      id: 'a3', difficulty: 'Basic',
      question: "How do you convert USD to Khmer Riel?",
      answer: "Multiply the USD amount by the current exchange rate (e.g., 4000).",
      example: "function convert(usd) { return usd * 4000; }"
    },
    {
      id: 'a4', difficulty: 'Basic',
      question: "What is Linear Search?",
      answer: "Searching for an item by checking every item in the list one-by-one from start to finish.",
      example: "Searching for a specific name on a printed list paper."
    },
    {
      id: 'a5', difficulty: 'Intermediate',
      question: "What is Binary Search?",
      answer: "A faster way to find an item in a SORTED list by repeatedly splitting the list in half.",
      example: "Searching for a word in a physical dictionary by opening to the middle, then choosing left or right."
    },
    {
      id: 'a6', difficulty: 'Basic',
      question: "How do you sort items from cheapest to most expensive?",
      answer: "By using a sorting algorithm that compares items two-by-two and swaps them if they are in the wrong order.",
      example: "Comparing product prices [5000, 2000, 8000] and ordering them [2000, 5000, 8000]."
    },
    {
      id: 'a7', difficulty: 'Basic',
      question: "How do you check if a number is even or odd?",
      answer: "Use the modulo operator (%). If 'num % 2 === 0', the number is even.",
      example: "10 % 2 is 0 (even), 11 % 2 is 1 (odd)."
    },
    {
      id: 'a8', difficulty: 'Intermediate',
      question: "How do you reverse a string/word?",
      answer: "Convert the string to an array, reverse the array, and join it back into a string.",
      example: "String 'abc' -> Array ['a', 'b', 'c'] -> ['c', 'b', 'a'] -> 'cba'."
    },
    {
      id: 'a9', difficulty: 'Basic',
      question: "How do you calculate the sum of all elements in an array?",
      answer: "Create a 'total' variable at 0, loop through the array, and add each item to total.",
      example: "[1, 2, 3] -> 1+2+3 = 6."
    },
    {
      id: 'a10', difficulty: 'Basic',
      question: "How do you remove duplicates from a list?",
      answer: "Convert the list to a 'Set' (which naturally keeps unique items) and then convert it back to an array.",
      example: "['A', 'B', 'A'] -> Set {'A', 'B'} -> ['A', 'B']."
    },
    {
      id: 'a11', difficulty: 'Intermediate',
      question: "What is Big O Notation?",
      answer: "A way to describe how much time an algorithm takes as the data size gets bigger.",
      example: "O(n) means it takes longer if the list gets longer."
    },
    {
      id: 'a12', difficulty: 'Intermediate',
      question: "How does a navigation app (like PassApp) find the shortest path?",
      answer: "It uses graph-based algorithms to find the shortest 'weight' (distance/time) between two intersections on a map.",
      example: "Calculating the fastest street path from Aeon 1 to Toul Tom Poung."
    },
    {
      id: 'a13', difficulty: 'Intermediate',
      question: "What is Recursion?",
      answer: "A function that calls itself to solve a smaller piece of a problem until it reaches a 'base case' (a stopping point).",
      example: "A function that counts down from 10 to 0."
    },
    {
      id: 'a14', difficulty: 'Basic',
      question: "How do you filter a list to get only active users?",
      answer: "Use the .filter() method which checks each item and keeps only those that return true for your condition.",
      example: "users.filter(user => user.isActive === true)."
    },
    {
      id: 'a15', difficulty: 'Intermediate',
      question: "What is a 'Palindrome' and how do you check for it?",
      answer: "A word that reads the same backward as forward (e.g., 'radar'). Check by comparing the word to its reversed version.",
      example: "radar === reverse('radar') -> true."
    }
  ],
  oop: [
    {
      id: 'oop1', difficulty: 'Basic',
      question: "What are the four core pillars of Object-Oriented Programming?",
      answer: "1. Encapsulation (hiding internal state). 2. Abstraction (simplifying interface interactions). 3. Inheritance (sharing properties/methods between parent/child). 4. Polymorphism (allowing different objects to respond to the same method call).",
      example: "A Car class hiding engine ignition details (Encapsulation) while offering a simple turnKey() method (Abstraction)."
    },
    {
      id: 'oop2', difficulty: 'Intermediate',
      question: "Explain Polymorphism with a practical example.",
      answer: "Polymorphism means 'many shapes'. It allows objects of different classes to be treated as objects of a common superclass, where each subclass implements a method in its own way.",
      example: "An Animal base class with a makeSound() method, where Dog barks and Cat meows."
    },
    {
      id: 'oop3', difficulty: 'Intermediate',
      question: "What is the difference between an Abstract Class and an Interface?",
      answer: "An Abstract Class can contain both abstract (empty) and concrete (implemented) methods, and can hold state. An Interface typically only defines method signatures (no implementation or state) that classes must implement.",
      example: "Abstract Class: Vehicle (has fuel variables). Interface: Drivable (only declares drive() contract)."
    },
    {
      id: 'oop4', difficulty: 'Intermediate',
      question: "Explain the concept of 'Composition over Inheritance'. Why is it preferred?",
      answer: "This design pattern suggests that classes should achieve polymorphic behavior and code reuse by containing instances of other helper classes (has-a) rather than inheriting behaviors from a parent class (is-a).",
      example: "A Robot class holding an Engine object and a Laser object, instead of inheriting from an Engine parent class."
    },
    {
      id: 'oop5', difficulty: 'Basic',
      question: "What is Method Overloading vs Method Overriding?",
      answer: "Method Overloading defines multiple methods with the same name but different signatures (parameters) in the same class. Method Overriding happens when a subclass provides a new implementation for an inherited parent method.",
      example: "Overloading: calc(x) vs calc(x, y). Overriding: Dog redefining animal's move() to run()."
    },
    {
      id: 'oop6', difficulty: 'Basic',
      question: "What is the difference between Encapsulation and Abstraction?",
      answer: "Encapsulation is about bundling data and methods together and hiding internal details (access control). Abstraction is about hiding complexity by showing only essential interfaces to the outside world.",
      example: "Encapsulation: making variables private. Abstraction: using a steering wheel without knowing how pistons move."
    },
    {
      id: 'oop7', difficulty: 'Basic',
      question: "What is the purpose of the 'super' keyword?",
      answer: "The 'super' keyword is used to access and call functions on an object's parent class. It is commonly used in constructors to pass parameters up to the parent's constructor.",
      example: "Constructor of Dog calling super(name) to initialize the parent Animal class constructor."
    },
    {
      id: 'oop8', difficulty: 'Basic',
      question: "Explain the role of a Constructor and a Destructor.",
      answer: "A Constructor is a special method called automatically when an object is instantiated to initialize its state. A Destructor is called when an object is deleted or goes out of scope, allowing you to free up memory.",
      example: "Constructor opening a log file; Destructor closing the log file to prevent memory leaks."
    },
    {
      id: 'oop9', difficulty: 'Basic',
      question: "What are Access Modifiers in OOP?",
      answer: "Access modifiers control the visibility of classes, methods, and variables. Common modifiers are public (accessible anywhere), private (accessible only within the class), and protected (accessible in the class and its subclasses).",
      example: "Marking class passwords 'private' to prevent direct modification from outside scripts."
    },
    {
      id: 'oop10', difficulty: 'Intermediate',
      question: "What is the Singleton design pattern and when should you use it?",
      answer: "The Singleton pattern restricts a class to a single instance throughout the application life cycle and provides a global access point to it.",
      example: "Managing a single shared connection pool to your database across the whole app."
    },
    {
      id: 'oop11', difficulty: 'Advanced',
      question: "What is Multiple Inheritance, and why do some languages avoid it?",
      answer: "Multiple Inheritance allows a class to inherit from more than one parent class. It is often avoided because it introduces the Diamond Problem, where ambiguity arises when parents implement the same method.",
      example: "A class inheriting from both Scanner and Printer, and resolving conflicting print() behaviors."
    },
    {
      id: 'oop12', difficulty: 'Basic',
      question: "What are Getters and Setters, and why should we use them?",
      answer: "Getters and Setters are methods used to safely read and write class property values. They provide control over access and let you run data validation before updating variables.",
      example: "A setAge(value) method that blocks negative numbers from being assigned."
    },
    {
      id: 'oop13', difficulty: 'Intermediate',
      question: "Explain Deep Copy vs Shallow Copy of an Object.",
      answer: "A Shallow Copy duplicates the top-level object, but nested objects still point to their original memory addresses. A Deep Copy duplicates everything recursively, creating a completely independent object.",
      example: "Modifying nested values in a shallow copy changes the original object; a deep copy keeps them separate."
    },
    {
      id: 'oop14', difficulty: 'Advanced',
      question: "What do the SOLID principles stand for in OOP design?",
      answer: "1. Single Responsibility. 2. Open/Closed (open for extension, closed for modification). 3. Liskov Substitution. 4. Interface Segregation. 5. Dependency Inversion.",
      example: "Splitting a User class into UserData storage and EmailSender service."
    },
    {
      id: 'oop15', difficulty: 'Intermediate',
      question: "Explain Association, Aggregation, and Composition.",
      answer: "Association is a relationship between independent objects. Aggregation is a 'has-a' relationship where child objects can exist independently of the parent. Composition is a strong 'has-a' relationship where child objects cannot exist without the parent.",
      example: "Aggregation: Department and Teacher. Composition: Building and Room."
    }
  ],
  database: [
    {
      id: 'sql1', difficulty: 'Basic',
      question: "Explain the difference between INNER JOIN and LEFT JOIN.",
      answer: "INNER JOIN returns records only when there is a matching value in both tables. LEFT JOIN returns all records from the left table, along with matching records from the right table (unmatched right columns return NULL).",
      example: "Finding only users who have placed orders (INNER) vs listing all users and showing any orders they made (LEFT)."
    },
    {
      id: 'sql2', difficulty: 'Intermediate',
      question: "What is database normalization and what are its main goals?",
      answer: "Normalization is the process of structuring a relational database to minimize data redundancy and prevent data anomalies (insert, update, and delete issues) by dividing large tables into smaller, linked tables.",
      example: "Moving department names from an Employee table to a separate Departments lookup table."
    },
    {
      id: 'sql3', difficulty: 'Basic',
      question: "What is a Primary Key vs a Foreign Key?",
      answer: "A Primary Key uniquely identifies each record in a table and cannot contain NULL values. A Foreign Key is a field in one table that links to the Primary Key of another table, enforcing relationships between them.",
      example: "An Employee ID (Primary Key) linking to a Department ID (Foreign Key) in another table."
    },
    {
      id: 'sql4', difficulty: 'Intermediate',
      question: "What is a Database Index and how does it speed up queries?",
      answer: "An Index is a data structure (usually a B-Tree) that helps the database find records quickly without having to scan every row in the table. However, indexes slow down write operations (INSERT, UPDATE, DELETE).",
      example: "Creating an index on an email column to speed up user login searches."
    },
    {
      id: 'sql5', difficulty: 'Basic',
      question: "What is the difference between SQL (Relational) and NoSQL (Non-Relational) databases?",
      answer: "SQL databases use structured tables, schemas, and relational links, scaling vertically. NoSQL databases use flexible formats like JSON documents, key-value pairs, or graphs, scaling horizontally.",
      example: "SQL: PostgreSQL for financial ledger tables. NoSQL: MongoDB for dynamic product catalogs."
    },
    {
      id: 'sql6', difficulty: 'Advanced',
      question: "Explain ACID properties in relational database transactions.",
      answer: "ACID ensures transaction reliability: 1. Atomicity (all changes succeed or all fail). 2. Consistency (data transitions safely between states). 3. Isolation (transactions don't interfere with each other). 4. Durability (saved data survives crashes).",
      example: "A bank transfer debiting Account A and crediting Account B: both must succeed, or neither does."
    },
    {
      id: 'sql7', difficulty: 'Basic',
      question: "What is a transaction rollback and why is it important?",
      answer: "A rollback reverts database changes back to their last saved state (commit point) if an error occurs during a transaction, keeping the database clean.",
      example: "Rolling back a user signup query if saving their default profile records fails."
    },
    {
      id: 'sql8', difficulty: 'Basic',
      question: "What is the purpose of GROUP BY in SQL and how does it differ from ORDER BY?",
      answer: "GROUP BY groups rows that share values into summary rows, often used with aggregate functions like COUNT or SUM. ORDER BY simply sorts the query results in ascending or descending order.",
      example: "GROUP BY department_id to count employees, then ORDER BY employee_count DESC."
    },
    {
      id: 'sql9', difficulty: 'Intermediate',
      question: "What is the difference between WHERE and HAVING clauses in SQL?",
      answer: "WHERE filters rows *before* any grouping or aggregations are calculated. HAVING filters grouped rows *after* the GROUP BY clause has been applied.",
      example: "WHERE salary > 50000 filters individual employees; HAVING COUNT(id) > 5 filters department groups."
    },
    {
      id: 'sql10', difficulty: 'Intermediate',
      question: "What is a Subquery and when should you use one?",
      answer: "A subquery is a query nested inside another SQL statement. It is used to calculate values that will be used by the outer query in its filtering or joining logic.",
      example: "SELECT name FROM users WHERE age > (SELECT AVG(age) FROM users);"
    },
    {
      id: 'sql11', difficulty: 'Intermediate',
      question: "What is a Database View and why is it useful?",
      answer: "A View is a virtual table defined by a stored query. It does not store physical data itself, but presents query results like a standard table, simplifying access and enhancing security.",
      example: "Creating a View that shows sales data without exposing underlying customer credit card info."
    },
    {
      id: 'sql12', difficulty: 'Intermediate',
      question: "Explain the difference between UNION and UNION ALL.",
      answer: "Both combine the results of two SELECT queries. UNION removes any duplicate rows from the final result set, while UNION ALL keeps all records, making it faster to execute.",
      example: "UNION combines active and archived customer lists without duplicating active-archived records."
    },
    {
      id: 'sql13', difficulty: 'Advanced',
      question: "What is the N+1 Query Problem and how do you fix it?",
      answer: "The N+1 problem happens when an app runs one query to fetch parent records, and then runs N individual queries to fetch children for each parent. Fix this by using JOINs or eager loading.",
      example: "Fetching 100 books and executing 100 queries to get authors vs running one JOIN query."
    },
    {
      id: 'sql14', difficulty: 'Basic',
      question: "What is the difference between UNIQUE and NOT NULL constraints?",
      answer: "A UNIQUE constraint ensures that all values in a column are different from each other. A NOT NULL constraint ensures that a column cannot store NULL values.",
      example: "An email column set to UNIQUE, and a password column set to NOT NULL."
    },
    {
      id: 'sql15', difficulty: 'Advanced',
      question: "What is Database Sharding and how does it differ from Replication?",
      answer: "Replication copies the exact same database to multiple servers to handle read traffic. Sharding splits a single database into smaller parts (shards) and distributes them across different servers to handle write traffic.",
      example: "Sharding customer tables by country ID so US data lives on Server A and European data on Server B."
    },
    {
      id: 'sql16', difficulty: 'Intermediate',
      question: "Difference between DELETE, TRUNCATE, and DROP?",
      answer: "DELETE removes rows and logs each deletion. TRUNCATE removes all rows without logging individual deletions. DROP removes the entire table structure from the database.",
      example: "DROP TABLE users; // Completely destroys the table object."
    },
    {
      id: 'sql17', difficulty: 'Intermediate',
      question: "What are Database Transactions?",
      answer: "A set of SQL operations treated as a single unit of work. ACID compliance ensures the unit either finishes completely or fails entirely, preventing partial updates.",
      example: "Transferring money: debit account A and credit account B; both must succeed."
    },
    {
      id: 'sql18', difficulty: 'Basic',
      question: "What is a Composite Primary Key?",
      answer: "A primary key composed of two or more columns used to uniquely identify a record. It is used when a single column is insufficient to guarantee uniqueness.",
      example: "A 'CourseRegistration' table where (student_id, course_id) is the composite primary key."
    },
    {
      id: 'sql19', difficulty: 'Basic',
      question: "How do you handle NULL values in SQL?",
      answer: "Use functions like COALESCE(col, 'default') or IFNULL(col, 'default') to return a fallback value if a field is NULL during query results.",
      example: "SELECT COALESCE(user_email, 'no-email') FROM users;"
    },
    {
      id: 'sql20', difficulty: 'Basic',
      question: "What are CHECK and DEFAULT constraints?",
      answer: "CHECK ensures values in a column meet specific logical conditions. DEFAULT assigns a specific value if none is provided during insertion.",
      example: "CHECK(age >= 18); DEFAULT 'Active' for a status column."
    },
    {
      id: 'sql21', difficulty: 'Basic',
      question: "Difference between CHAR and VARCHAR?",
      answer: "CHAR stores fixed-length strings (padded with spaces). VARCHAR stores variable-length strings, only using the exact amount of space needed for the data.",
      example: "CHAR(10) always uses 10 bytes; VARCHAR(10) uses only the string length plus one byte."
    },
    {
      id: 'sql22', difficulty: 'Advanced',
      question: "What is a Stored Procedure?",
      answer: "A pre-compiled collection of SQL statements and logic stored on the database server that can be reused by multiple applications.",
      example: "A 'GenerateMonthlyReport' procedure that runs complex aggregations daily."
    },
    {
      id: 'sql23', difficulty: 'Advanced',
      question: "What is a Trigger in SQL?",
      answer: "A special type of stored procedure that automatically runs when an event occurs (e.g., INSERT, UPDATE, or DELETE) on a specified table.",
      example: "Logging every change made to a sensitive 'Salary' table to a separate 'AuditLog' table."
    },
    {
      id: 'sql24', difficulty: 'Intermediate',
      question: "Purpose of LIMIT and OFFSET in SQL pagination?",
      answer: "LIMIT restricts the number of rows returned. OFFSET skips a number of rows before beginning to return results, used for loading specific pages of data.",
      example: "LIMIT 10 OFFSET 20 fetches the third page (records 21-30)."
    },
    {
      id: 'sql25', difficulty: 'Advanced',
      question: "Difference between Clustered and Non-Clustered Indexes?",
      answer: "A clustered index sorts and stores data rows in the table physically based on its key (only one per table). A non-clustered index creates a separate structure pointing to the actual data (can have many).",
      example: "Clustered index for UserID (physical order); non-clustered for Email (lookup pointer)."
    }
  ],
  api_backend: [
    {
      id: 'api1', difficulty: 'Basic',
      question: "What is the main difference between GET and POST HTTP requests?",
      answer: "GET requests data from a resource, using URL parameters to pass information, and can be cached. POST submits data to a resource, passing information inside the request body, and cannot be cached.",
      example: "GET /api/products?id=123 (fetches item details) vs POST /api/products (creates a new item)."
    },
    {
      id: 'api2', difficulty: 'Basic',
      question: "What makes an API RESTful?",
      answer: "RESTful APIs follow architectural principles: stateless communication, using standard HTTP methods (GET, POST, PUT, DELETE), client-server separation, cacheable responses, and identifying resources via URLs.",
      example: "Structuring endpoints logically like GET /users/1 and DELETE /users/1."
    },
    {
      id: 'api3', difficulty: 'Basic',
      question: "Explain common HTTP Status Code ranges.",
      answer: "Status codes inform the client about the outcome of their request: 1xx (Informational), 2xx (Success, e.g., 200 OK), 3xx (Redirection), 4xx (Client Error, e.g., 404 Not Found), and 5xx (Server Error, e.g., 500 Internal Server Error).",
      example: "Receiving a 401 Unauthorized status when trying to access a page without logging in."
    },
    {
      id: 'api4', difficulty: 'Intermediate',
      question: "What is Middleware in backend frameworks?",
      answer: "Middleware is code that runs between receiving an incoming HTTP request and sending the final response. It is commonly used for logging, checking authentication, or parsing data.",
      example: "An authentication middleware that blocks unauthorized requests before they reach the database."
    },
    {
      id: 'api5', difficulty: 'Intermediate',
      question: "Compare Session-based and Token-based (JWT) authentication.",
      answer: "Session authentication is stateful, storing login data on the server and using a session ID cookie. Token-based authentication (JWT) is stateless; the server signs a token and sends it to the client, which sends it back in headers.",
      example: "JWT tokens are popular for APIs since they don't require lookup tables on the server for verification."
    },
    {
      id: 'api6', difficulty: 'Intermediate',
      question: "What is a Webhook and how does it differ from API polling?",
      answer: "API polling is when the client repeatedly asks the server for updates. A Webhook is a server-to-server push where the server automatically sends data to the client as soon as an event occurs.",
      example: "Stripe sending an automated POST request to your backend whenever a customer's payment succeeds."
    },
    {
      id: 'api7', difficulty: 'Intermediate',
      question: "What is CORS and why is it important?",
      answer: "CORS (Cross-Origin Resource Sharing) is a browser security feature that restricts web apps from making API requests to a different domain than the one that served the app, preventing malicious script access.",
      example: "Configuring your backend to allow requests coming from frontend domain https://myapp.com."
    },
    {
      id: 'api8', difficulty: 'Advanced',
      question: "What is a Reverse Proxy and why would you use one?",
      answer: "A reverse proxy is a server (like Nginx) that sits in front of backend servers, routing client requests to them. It is used for load balancing, caching content, handling SSL encryption, and security.",
      example: "Nginx accepting public web requests and routing them to Node.js services running in private networks."
    },
    {
      id: 'api9', difficulty: 'Basic',
      question: "Explain MVC (Model-View-Controller) architecture.",
      answer: "MVC splits an application into three parts: the Model (manages data and logic), the View (handles the UI and presentation), and the Controller (processes user input and updates the Model/View).",
      example: "A backend routing layer (Controller) fetching data (Model) and passing it to a web page (View)."
    },
    {
      id: 'api10', difficulty: 'Intermediate',
      question: "Compare WebSockets and standard HTTP communication.",
      answer: "HTTP is unidirectional (client requests, server responds) and disconnects after each call. WebSockets establish a persistent, bidirectional, real-time connection between client and server over a single TCP socket.",
      example: "Using WebSockets for live chat apps, and standard HTTP requests for loading user profile settings."
    },
    {
      id: 'api11', difficulty: 'Basic',
      question: "What is the difference between Query Parameters and Path Parameters?",
      answer: "Path parameters identify a specific resource in the URL path. Query parameters filter or sort resources, appended to the end of the URL with a question mark.",
      example: "/users/5 (Path parameter for User 5) vs /users?sort=asc (Query parameter sorting users)."
    },
    {
      id: 'api12', difficulty: 'Intermediate',
      question: "What is API Rate Limiting and why is it crucial?",
      answer: "Rate limiting controls the number of requests a client can make to an API within a specific timeframe. It protects servers from being overwhelmed, prevents abuse, and mitigates DDoS attacks.",
      example: "Restricting an API key to a maximum of 60 requests per minute."
    },
    {
      id: 'api13', difficulty: 'Advanced',
      question: "Explain the difference between Stateful and Stateless system designs.",
      answer: "A stateful system saves client interaction history and session details on the server. A stateless system does not store client data on the server; each request must contain all the information needed to process it.",
      example: "Stateless architectures are much easier to scale because any server can process any incoming request."
    },
    {
      id: 'api14', difficulty: 'Advanced',
      question: "How does Backend Caching work, and what is Redis?",
      answer: "Backend caching stores frequently requested data in fast memory (RAM) instead of running slow database queries. Redis is an in-memory key-value database widely used for caching session and API data.",
      example: "Caching a popular blog post in memory for 1 hour instead of reading it from the database for every hit."
    },
    {
      id: 'api15', difficulty: 'Advanced',
      question: "Compare Monolithic and Microservices architectures.",
      answer: "A Monolith builds the entire application as a single unit, which is easy to develop but hard to scale. Microservices split the app into independent services that communicate via APIs, making updates and scaling easier.",
      example: "A monolith handling billing, search, and users together vs separate services for each task."
    }
  ],
  security: [
    {
      id: 'sec1', difficulty: 'Basic',
      question: "Explain the difference between Authentication and Authorization.",
      answer: "Authentication verifies *who* a user is (e.g., login with password). Authorization verifies *what* permissions they have once logged in (e.g., admin controls).",
      example: "Logging in validates authentication; trying to delete a database table checks authorization."
    },
    {
      id: 'sec2', difficulty: 'Intermediate',
      question: "What is SQL Injection (SQLi) and how do you prevent it?",
      answer: "SQLi is an attack where malicious SQL code is injected into input fields to bypass security and run database commands. Prevent this by using parameterized queries and prepared statements.",
      example: "Using `SELECT * FROM users WHERE id = ?` instead of directly joining string inputs."
    },
    {
      id: 'sec3', difficulty: 'Intermediate',
      question: "What is Cross-Site Scripting (XSS) and how do you defend against it?",
      answer: "XSS is an attack where malicious JavaScript is injected into trusted websites to steal user sessions or cookies. Defend against it by sanitizing input, escaping output, and using Content Security Policies.",
      example: "Converting input `<script>` tags to safe characters like `&lt;script&gt;` before rendering."
    },
    {
      id: 'sec4', difficulty: 'Intermediate',
      question: "What is CSRF (Cross-Site Request Forgery) and how do you protect against it?",
      answer: "CSRF forces an authenticated user to run unwanted actions on a web app. Protect against it by using unique CSRF tokens with every state-changing request, and setting the SameSite cookie attribute.",
      example: "An attacker tricking a logged-in user into clicking a link that secretly triggers a bank transfer."
    },
    {
      id: 'sec5', difficulty: 'Basic',
      question: "Why should you never store passwords in plain text, and what are Salts?",
      answer: "Plain text passwords are easily stolen in a data breach. Instead, use secure hashing algorithms (like bcrypt). A Salt is a unique, random string added to each password before hashing to prevent rainbow table attacks.",
      example: "Password 'secret' + salt 'x82j' hashed together to create a unique hashed string."
    },
    {
      id: 'sec6', difficulty: 'Intermediate',
      question: "What is JWT (JSON Web Token) and how is it structured?",
      answer: "JWT is a compact, URL-safe way to share information securely between two parties. It has three parts separated by dots: Header (metadata), Payload (user claims), and Signature (verifies integrity).",
      example: "A server checking the signature of an incoming JWT to trust user login data without checking a session table."
    },
    {
      id: 'sec7', difficulty: 'Intermediate',
      question: "What are Secure, HttpOnly, and SameSite cookie attributes?",
      answer: "These attributes secure cookies: HttpOnly blocks JavaScript access (stopping XSS theft), Secure ensures cookies are only sent over HTTPS, and SameSite restricts cookies from being sent in cross-site requests (blocking CSRF).",
      example: "Storing session IDs in an HttpOnly cookie to keep malicious scripts from accessing them."
    },
    {
      id: 'sec8', difficulty: 'Advanced',
      question: "What is Content Security Policy (CSP)?",
      answer: "CSP is an HTTP header that lets site operators control which resources (JavaScript, CSS, Images) the browser is allowed to load for that page, helping prevent XSS attacks.",
      example: "A CSP policy restricting scripts to only load from your own domain and trusted external sources."
    },
    {
      id: 'sec9', difficulty: 'Basic',
      question: "How does HTTPS protect data and prevent Man-in-the-Middle (MitM) attacks?",
      answer: "HTTPS encrypts the communication channel between the client and server using TLS/SSL. This ensures that any intercepted data is unreadable, and SSL certificates confirm you are connecting to the genuine server.",
      example: "An attacker on public Wi-Fi only seeing scrambled data instead of your credit card details."
    },
    {
      id: 'sec10', difficulty: 'Intermediate',
      question: "How can a misconfigured CORS policy cause security issues?",
      answer: "If your backend CORS is misconfigured to allow all origins (`Access-Control-Allow-Origin: *`) while also sending credentials, unauthorized sites can read sensitive data from your API.",
      example: "A malicious site running background scripts to fetch user data from your insecure API."
    },
    {
      id: 'sec11', difficulty: 'Basic',
      question: "What is a Distributed Denial of Service (DDoS) attack and how is it mitigated?",
      answer: "A DDoS attack attempts to crash a server or network by flooding it with massive volumes of traffic from multiple systems. Mitigate this using rate limiting, web application firewalls (WAF), and CDN routing.",
      example: "Cloudflare filtering out bad bot traffic to keep a site online during an attack."
    },
    {
      id: 'sec12', difficulty: 'Advanced',
      question: "Compare Symmetric and Asymmetric encryption.",
      answer: "Symmetric encryption uses the same key to both encrypt and decrypt data (fast, but hard to share keys securely). Asymmetric encryption uses a Public Key to encrypt data and a private Private Key to decrypt it.",
      example: "Using asymmetric encryption to securely share a symmetric key, then using symmetric encryption for fast data transfers."
    },
    {
      id: 'sec13', difficulty: 'Basic',
      question: "What is Brute-Force protection and how is it implemented?",
      answer: "Brute-force protection stops attackers from guessing passwords by trying thousands of combinations. It is implemented by locking accounts after a few failed attempts, introducing login delays, or using CAPTCHAs.",
      example: "Locking a user account for 15 minutes after 5 failed password attempts."
    },
    {
      id: 'sec14', difficulty: 'Advanced',
      question: "What is Broken Access Control and how do you prevent it?",
      answer: "Broken Access Control occurs when users can access resources or actions outside their permissions. Prevent this by checking user authorizations on the backend for every request, not just hiding buttons on the frontend.",
      example: "Verifying that a user attempting to delete a document is actually the owner of that document."
    },
    {
      id: 'sec15', difficulty: 'Intermediate',
      question: "What is the OWASP Top 10?",
      answer: "The OWASP Top 10 is a standard awareness document representing the ten most critical security vulnerabilities found in modern web applications, updated regularly by security experts.",
      example: "Using the OWASP checklist to audit your app for security issues like injection, broken authentication, and security misconfigurations."
    }
  ]
};

const QuestionAccordion = ({ question, answer, example, difficulty }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Basic': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'Intermediate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'Advanced': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl mb-3 bg-white dark:bg-slate-800 shadow-sm overflow-hidden transition-all duration-300">
      <div 
        className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/40 flex justify-between items-start gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-[15px] sm:text-base">{question}</h3>
        </div>
        <div className="mt-1 bg-slate-100 dark:bg-slate-700 p-1.5 rounded-full text-slate-500 dark:text-slate-400">
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 animate-in slide-in-from-top-2 duration-200">
          <div className="mb-4">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Trainer's Ideal Answer</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
          {example && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Practical Example / Analogy</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 italic">{example}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  
  const [sessions, setSessions] = useLocalStorage('interview_sessions_v2', [
    { id: 'session_1', name: 'Alice Johnson', date: new Date().toISOString(), scores: {}, notes: {} }
  ]);
  const [activeSessionId, setActiveSessionId] = useLocalStorage('active_session_id_v2', 'session_1');
  const [isDarkMode, setIsDarkMode] = useLocalStorage('interview_theme_v2', false);

  const activeSession = useMemo(() => {
    return sessions.find(s => s.id === activeSessionId) || sessions[0] || { id: 'temp', name: 'Anonymous', date: new Date().toISOString(), scores: {}, notes: {} };
  }, [sessions, activeSessionId]);

  const scores = activeSession.scores || {};
  const notes = activeSession.notes || {};

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { totalScore, maxPossible, avgScore, skillLevel, completedCategories } = useMemo(() => {
    const scorableCategories = CATEGORIES.filter(c => c.id !== 'dashboard');
    let total = 0;
    let completed = 0;
    
    scorableCategories.forEach(cat => {
      if (scores[cat.id]) {
        total += scores[cat.id];
        completed++;
      }
    });

    const max = scorableCategories.length * 5;
    const avg = completed > 0 ? (total / completed).toFixed(1) : '0.0';
    
    let level = "Beginner";
    const numAvg = parseFloat(avg);
    if (numAvg >= 4.5) level = "Advanced Plus";
    else if (numAvg >= 3.8) level = "Advanced";
    else if (numAvg >= 2.8) level = "Intermediate";
    else if (numAvg >= 1.8) level = "Basic";
    
    if (completed === 0) level = "Not Evaluated";

    return { totalScore: total, maxPossible: max, avgScore: avg, skillLevel: level, completedCategories: completed };
  }, [scores]);

  const updateActiveSession = (updates) => {
    setSessions(prev => prev.map(s => s.id === activeSession.id ? { ...s, ...updates } : s));
  };

  const handleScoreChange = (score) => {
    updateActiveSession({ scores: { ...scores, [activeTab]: score } });
  };

  const handleNoteChange = (e) => {
    updateActiveSession({ notes: { ...notes, [activeTab]: e.target.value } });
  };

  const addNewCandidate = () => {
    const newId = 'session_' + Date.now();
    const newSession = { 
      id: newId, 
      name: `Candidate ${sessions.length + 1}`, 
      date: new Date().toISOString(), 
      scores: {}, 
      notes: {} 
    };
    setSessions([...sessions, newSession]);
    setActiveSessionId(newId);
    setActiveTab('dashboard');
  };

  const deleteCandidate = (id) => {
    const newSessions = sessions.filter(s => s.id !== id);
    if (newSessions.length === 0) {
      const fallbackId = 'session_fallback';
      const fallbackSession = { id: fallbackId, name: 'Candidate 1', date: new Date().toISOString(), scores: {}, notes: {} };
      setSessions([fallbackSession]);
      setActiveSessionId(fallbackId);
    } else {
      setSessions(newSessions);
      if (activeSessionId === id) {
        setActiveSessionId(newSessions[0].id);
      }
    }
    setCandidateToDelete(null);
  };

  const updateCandidateName = (id, newName) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, name: newName } : s));
  };

  const resetCurrentCandidate = () => {
    updateActiveSession({ scores: {}, notes: {} });
  };

  const exportReport = () => {
    let report = `TECHNICAL MOCK INTERVIEW ASSESSMENT REPORT\n`;
    report += `=====================================================\n`;
    report += `Candidate: ${activeSession.name.toUpperCase()}\n`;
    report += `Date of Assessment: ${new Date(activeSession.date).toLocaleDateString()} ${new Date(activeSession.date).toLocaleTimeString()}\n`;
    report += `=====================================================\n\n`;
    
    report += `SUMMARY CRITERIA:\n`;
    report += `-----------------------------------------------------\n`;
    report += `Total Evaluated Score  : ${totalScore} / ${maxPossible}\n`;
    report += `Average Score          : ${avgScore} / 5.0\n`;
    report += `Assessed Skill Level   : ${skillLevel.toUpperCase()}\n`;
    report += `Completed Categories   : ${completedCategories} / ${CATEGORIES.length - 1}\n\n`;
    
    report += `DETAILED CATEGORY BREAKDOWN:\n`;
    report += `-----------------------------------------------------\n`;

    CATEGORIES.filter(c => c.id !== 'dashboard').forEach(cat => {
      const score = scores[cat.id] || 'Pending Evaluation';
      const note = notes[cat.id] || 'No supplemental evaluation notes logged.';
      report += `• [ ${cat.name.toUpperCase()} ]\n`;
      report += `  Score Assessed: ${score}/5\n`;
      report += `  Trainer Notes : ${note}\n`;
      report += `-----------------------------------------------------\n`;
    });

    report += `\nReport generated by TechTrainer Assistant Platform.\n`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Interview_Report_${activeSession.name.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentQuestions = QUESTION_BANK[activeTab] || [];
  const filteredQuestions = currentQuestions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  const activeCategoryData = CATEGORIES.find(c => c.id === activeTab);
  const isDashboard = activeTab === 'dashboard';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col md:flex-row relative">
      
      {/* Delete Confirmation Modal */}
      {candidateToDelete && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-sm w-full p-6 shadow-xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Delete Candidate Session?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              This will permanently delete the active scores and records of this candidate. This action is irreversible.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setCandidateToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteCandidate(candidateToDelete)}
                className="px-4 py-2 text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 rounded-lg transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-2 font-bold text-teal-400">
          <BrainCircuit className="w-6 h-6 animate-pulse" /> 
          <span className="tracking-wide">TechTrainer Pro</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-800 rounded-lg text-slate-200 hover:text-white">
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Left Sidebar Layout */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-72 bg-slate-900 text-slate-100 flex flex-col z-40 transition-transform duration-300 ease-in-out`}>
        <div className="p-6 hidden md:flex items-center gap-3 font-extrabold text-xl text-teal-400 border-b border-slate-800">
          <BrainCircuit className="w-8 h-8" />
          <span className="tracking-tight">TechTrainer Pro</span>
        </div>

        {/* Dynamic Candidate Selector Widget */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Quick Session Switch</label>
          <div className="relative">
            <select
              value={activeSessionId}
              onChange={(e) => {
                setActiveSessionId(e.target.value);
                setActiveTab('dashboard');
              }}
              className="w-full appearance-none bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium truncate"
            >
              {sessions.map(s => (
                <option key={s.id} value={s.id}>{s.name || 'Unnamed Candidate'}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button 
            onClick={addNewCandidate}
            className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-teal-950 text-teal-400 hover:bg-teal-900 rounded-lg text-xs font-semibold tracking-wide transition-all border border-teal-900/40"
          >
            <UserPlus className="w-4 h-4" /> Add New Candidate
          </button>
        </div>
        
        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto py-3">
          <nav className="px-3 space-y-1">
            {CATEGORIES.map((category) => {
              const isSelected = activeTab === category.id;
              const hasScore = scores[category.id] !== undefined;
              
              return (
                <button
                  key={category.id}
                  onClick={() => { setActiveTab(category.id); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isSelected 
                      ? 'bg-slate-800 text-teal-400 shadow-inner' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={isSelected ? 'text-teal-400' : 'text-slate-500'}>
                      {category.icon}
                    </div>
                    <span className="truncate">{category.name}</span>
                  </div>
                  {hasScore && category.id !== 'dashboard' && (
                    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[9px] text-slate-900 font-bold">
                      {scores[category.id]}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Theme Settings at bottom */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-all"
          >
            {isDarkMode ? <><Sun className="w-4 h-4 text-amber-400" /> Light Theme</> : <><Moon className="w-4 h-4 text-indigo-400" /> Dark Theme</>}
          </button>
        </div>
      </div>

      {/* Main Panel Frame */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Candidate Name Input Widget - Editable Header */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1.5">Candidate Under Assessment (Click text to rename)</label>
                <div className="flex items-center gap-2 group">
                  <Edit3 className="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors shrink-0" />
                  <input
                    type="text"
                    value={activeSession.name}
                    onChange={(e) => updateCandidateName(activeSession.id, e.target.value)}
                    className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white bg-transparent border-b-2 border-dashed border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-teal-500 focus:outline-none w-full py-0.5 transition-all"
                    placeholder="Enter Candidate Name"
                  />
                </div>
              </div>
              <div className="text-left md:text-right text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">Assessment ID: #{activeSession.id}</span>
                Created {new Date(activeSession.date).toLocaleDateString()} at {new Date(activeSession.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>

            {isDashboard ? (
              <div className="animate-in fade-in duration-300">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Trainer Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Aggregate performance insights for the selected candidate.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <button 
                      onClick={resetCurrentCandidate} 
                      className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all text-xs font-semibold"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Reset Current Scores
                    </button>
                    <button 
                      onClick={exportReport} 
                      className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-md text-xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" /> Export TXT Report
                    </button>
                  </div>
                </div>

                {/* Scorecards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {/* Total score box */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                    <h3 className="text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-widest text-[10px]">Total Combined Score</h3>
                    <div className="text-4xl font-extrabold text-slate-800 dark:text-white mb-1.5">
                      {totalScore}<span className="text-lg text-slate-400 font-normal">/{maxPossible}</span>
                    </div>
                    <div className="text-xs font-semibold px-2.5 py-0.5 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 rounded-full">
                      Avg Score: {avgScore} / 5
                    </div>
                  </div>

                  {/* Level rating box */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                    <h3 className="text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-widest text-[10px]">Assessed Level</h3>
                    <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400 mb-2">
                      {skillLevel}
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 max-w-[150px]">
                      <div className="bg-teal-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(parseFloat(avgScore) / 5) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Category completion box */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                    <h3 className="text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-widest text-[10px]">Progress Scorecard</h3>
                    <div className="text-4xl font-extrabold text-slate-800 dark:text-white mb-1.5">
                      {completedCategories}<span className="text-lg text-slate-400 font-normal">/{CATEGORIES.length - 1}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Assessed Categories</p>
                  </div>
                </div>

                {/* Score breakdown per category */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
                  <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                    <h3 className="font-bold text-sm flex items-center gap-2"><Award className="w-4 h-4 text-teal-500" /> Topic Evaluation Summary</h3>
                    <span className="text-[11px] text-slate-500 font-medium">15+ questions available per topic</span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {CATEGORIES.filter(c => c.id !== 'dashboard').map(cat => (
                      <div 
                        key={cat.id} 
                        onClick={() => setActiveTab(cat.id)}
                        className="p-4 px-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg group-hover:text-teal-500 group-hover:bg-teal-50 dark:group-hover:bg-teal-950/20 transition-all">
                            {cat.icon}
                          </div>
                          <span className="font-semibold text-xs sm:text-sm group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{cat.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {scores[cat.id] ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40">
                              {scores[cat.id]} / 5 Score
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
                              Unevaluated
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Candidates table roster */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
                    <h3 className="font-bold text-sm flex items-center gap-2"><Users className="w-4 h-4 text-teal-500" /> Candidate Management Roster</h3>
                    <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-800 px-2.5 py-0.5 rounded-full text-slate-600 dark:text-slate-300">{sessions.length} Active Sessions</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-[10px] text-slate-400 dark:text-slate-500 uppercase bg-slate-50/20 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800">
                        <tr>
                          <th className="px-6 py-3 font-semibold">Candidate Identifier</th>
                          <th className="px-6 py-3 font-semibold">Start Date</th>
                          <th className="px-6 py-3 font-semibold">Completed Modules</th>
                          <th className="px-6 py-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessions.map((session) => {
                          const evalCount = Object.keys(session.scores || {}).length;
                          const isActive = activeSessionId === session.id;
                          
                          return (
                            <tr key={session.id} className={`border-b border-slate-100 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all ${isActive ? 'bg-teal-50/10 dark:bg-teal-950/10' : ''}`}>
                              <td className="px-6 py-4 font-bold text-xs sm:text-sm">
                                <div className="flex items-center gap-2">
                                  {isActive && <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></div>}
                                  <span className={isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-800 dark:text-slate-200'}>{session.name || 'Unnamed Candidate'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{new Date(session.date).toLocaleDateString()}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${evalCount > 0 ? 'bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-900/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                                  {evalCount} / {CATEGORIES.length - 1} Evaluated
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {!isActive && (
                                    <button 
                                      onClick={() => setActiveSessionId(session.id)}
                                      className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-xs font-bold px-2.5 py-1 hover:bg-teal-50 dark:hover:bg-teal-950/30 rounded-lg transition-colors"
                                    >
                                      Load Profile
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => setCandidateToDelete(session.id)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
                                    title="Delete Session"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest block mb-0.5">Active Topic Module</span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
                      <span className="p-1.5 bg-teal-500/10 text-teal-500 rounded-lg">{activeCategoryData?.icon}</span>
                      {activeCategoryData?.name}
                    </h1>
                  </div>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="self-start sm:self-auto text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-teal-500 transition-colors"
                  >
                    ← Back to Dashboard Overview
                  </button>
                </div>

                {/* Score slider/input panel */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Assess Skill Level (1-5)</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Rate how confidently the candidate answered questions in this module.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {[
                        { val: 1, label: 'Poor' },
                        { val: 2, label: 'Basic' },
                        { val: 3, label: 'Fair' },
                        { val: 4, label: 'Good' },
                        { val: 5, label: 'Strong' }
                      ].map(sc => (
                        <button
                          key={sc.val}
                          onClick={() => handleScoreChange(sc.val)}
                          className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-xs transition-all border ${
                            scores[activeTab] === sc.val 
                              ? 'bg-teal-600 border-teal-600 text-white shadow-md transform scale-105 font-bold' 
                              : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <span className="text-sm font-extrabold">{sc.val}</span>
                          <span className="text-[8px] opacity-85 uppercase">{sc.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Trainer Assessment Notes (Saves automatically)</label>
                    <textarea 
                      value={notes[activeTab] || ''}
                      onChange={handleNoteChange}
                      placeholder="Add observations about strengths, code gaps, or specific questions answered poorly..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[90px] text-slate-800 dark:text-slate-100 transition-all placeholder-slate-400 dark:placeholder-slate-600"
                    />
                  </div>
                </div>

                {/* Filter / Search header bar */}
                <div className="flex flex-col md:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search questions or keyword answers..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600">
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex gap-1 bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 rounded-xl shrink-0">
                    {['All', 'Basic', 'Intermediate', 'Advanced'].map(diff => (
                      <button
                        key={diff}
                        onClick={() => setDifficultyFilter(diff)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          difficultyFilter === diff
                            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Question lists */}
                <div className="space-y-3 mb-12">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex justify-between items-center">
                    <span>Curated Question List</span>
                    <span className="text-teal-600 dark:text-teal-400">{filteredQuestions.length} of {currentQuestions.length} Match</span>
                  </div>
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q) => (
                      <QuestionAccordion key={q.id} {...q} />
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No criteria questions match your current search constraints.</p>
                      <button 
                        onClick={() => {setSearchQuery(''); setDifficultyFilter('All');}}
                        className="mt-3 text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"
                      >
                        Reset Search Filters
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
