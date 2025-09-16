# AI Agent Instructions for ClassTrack

This document guides AI coding agents on the key patterns and practices in the ClassTrack attendance management system.

## Architecture Overview

ClassTrack is a React-based single-page application with these key characteristics:

- **Component Structure**:
  - `App.jsx`: Root component with minimal layout
  - `MainContent.jsx`: Core business logic and state management
  - Individual feature components in `src/components/`

- **Data Flow**:
  - State management via React hooks (no Redux/Context)
  - Data persistence through localStorage (`Data.jsx`)
  - Parent-to-child prop drilling for component communication

## Key Patterns

### State Management
```jsx
// Example from MainContent.jsx
const [subjects, setSubjects] = useState([]);
// Always pair state updates with localStorage saves
setSubjects(updatedSubjects);
saveSubjects(updatedSubjects);
```

### Component Props Pattern
Components expect specific props for data and callbacks:
```jsx
// Subject.jsx prop signature
{
  title: string,
  faculty: string,
  present: number,
  absent: number,
  totalClasses: number,
  percentage: number,
  markPresent: () => void,
  markAbsent: () => void,
  handleDelete: () => void
}
```

### Styling Conventions
- TailwindCSS for all styling
- Consistent color scheme using Tailwind's zinc/gray palette
- Responsive design using flex layouts
- Standard spacing units: p-4, m-2.5, gap-5

## Development Workflow

1. **Local Development**:
   ```bash
   npm install
   npm run dev   # Starts dev server at localhost:5173
   ```

2. **Adding New Features**:
   - Create component in `src/components/[Feature]/[Feature].jsx`
   - Add state management in `MainContent.jsx` if needed
   - Update localStorage schema in `Data.jsx` if adding new data fields

## Common Tasks

### Adding a New Subject Card Feature
1. Add props to Subject component
2. Update state structure in MainContent
3. Extend localStorage save/load in Data.jsx
4. Update percentage calculation if needed

### Modifying Data Structure
Always update these files together:
- `Data.jsx` for storage logic
- `MainContent.jsx` for state management
- Relevant component props

## Project Conventions

- All components are functional components with hooks
- Percentage calculations happen in MainContent before passing to Subject
- Delete operations are confirmed through UI
- Buttons use consistent color coding (green: positive, red: negative)