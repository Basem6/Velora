# CLAUDE PROJECT RULES

## Project Stack

- React
- React Router
- Context API + Reducer
- Tailwind CSS
- GSAP
- E-commerce architecture

---

# CORE RULES

## DO NOT BREAK EXISTING FEATURES

- Never modify working functionality unless explicitly requested.
- Never rewrite large sections of code unnecessarily.
- Never change app behavior silently.
- Preserve all existing business logic.

---

# SAFE EDITING RULES

## Only modify what is requested

- Edit the minimum amount of code possible.
- Do not touch unrelated files.
- Do not refactor unless explicitly requested.
- Do not rename variables, functions, folders, routes, or components without permission.

---

# FILE MANAGEMENT RULES

- Never delete files automatically.
- Never move files between folders.
- Never create duplicate components.
- Ask before creating new folders.
- Ask before installing packages or dependencies.

---

# REACT RULES

## Components

- Use functional components only.
- Preserve existing component structure.
- Keep props API unchanged unless requested.

## State Management

- Preserve Context + Reducer architecture.
- Never mutate state directly.
- Always return new arrays/objects in reducers.

Correct:

```js
return state.map(item =>
  item.id === action.payload
    ? { ...item, liked: true }
    : item
)

CODE STYLE RULES
Write clean and readable code.
Prefer early returns.
Avoid deeply nested conditions.
Remove unused imports.
Use meaningful variable names.
Keep formatting consistent with existing codebase.