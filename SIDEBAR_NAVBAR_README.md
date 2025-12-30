# Sidebar Navbar Implementation

## Overview
A fully functional sidebar navbar has been implemented in the header component with Bootstrap 5 and Font-Awesome 4.7 styling.

## Features Implemented

### 1. **Top Navigation Bar (Dark)**
- Dark-colored navbar fixed at the top
- Toggle button to show/hide sidebar
- App branding with leaf icon
- User information display (when logged in)
- Logout button in navbar

### 2. **Sidebar Navigation**
- Fixed position sidebar on the left
- Toggle functionality with smooth animation
- Responsive design (collapses on mobile devices)
- Navigation links with icons:
  - Dashboard (home icon)
  - Employees (users icon)
  - Leave Requests (file icon)
  - Leave Balance (calendar icon)
  - Settings (cog icon)
- Logout option in sidebar

### 3. **User Authentication**
- Displays logged-in username fetched from `localStorage`
- Shows user profile icon next to username
- Logout functionality that:
  - Clears user data from localStorage
  - Removes auth token
  - Redirects to login page

### 4. **Responsive Design**
- Desktop: Sidebar visible by default on the left
- Tablet & Mobile: Sidebar hidden by default, accessible via toggle button
- Smooth transitions and animations
- Mobile-optimized button sizes

## How to Use

### For Login Integration
When a user logs in, store the username in localStorage:

```typescript
// In your login component
localStorage.setItem('loggedInUser', 'username');
localStorage.setItem('authToken', 'your-auth-token');
```

### Navigation Links
Update the navigation links in [header.html](src/app/pages/header/header.html) based on your routes:

```html
<a class="nav-link" routerLink="/your-route">
  <i class="fa fa-icon-name"></i>
  <span class="nav-text">Link Name</span>
</a>
```

### Available Font-Awesome Icons
Some useful icons for admin panels:
- `fa fa-home` - Dashboard
- `fa fa-users` - Employees
- `fa fa-file-text` - Requests
- `fa fa-calendar` - Calendar/Leave Balance
- `fa fa-cog` - Settings
- `fa fa-bar-chart` - Reports
- `fa fa-download` - Downloads
- `fa fa-bell` - Notifications

## Component Structure

### Files Modified/Created:

1. **[src/app/pages/header/header.ts](src/app/pages/header/header.ts)**
   - Added sidebar toggle functionality
   - Added user authentication retrieval
   - Added logout functionality
   - Imported CommonModule and RouterLink

2. **[src/app/pages/header/header.html](src/app/pages/header/header.html)**
   - Top navigation bar with user info
   - Sidebar with navigation links
   - Responsive layout structure

3. **[src/app/pages/header/header.css](src/app/pages/header/header.css)**
   - Sidebar styling with smooth transitions
   - Responsive breakpoints
   - Bootstrap 5 integration
   - Custom scrollbar styling

4. **[src/app/app.ts](src/app/app.ts)**
   - Added Header component import
   - Included Header in component imports

5. **[src/app/app.html](src/app/app.html)**
   - Added `<app-header>` component
   - Maintained router outlet

## Styling Details

### Color Scheme
- **Navbar**: Dark background (`bg-dark`)
- **Sidebar**: Light background (`bg-light`)
- **Active Links**: Blue highlight with left border
- **Hover State**: Light gray background with blue text
- **Logout Button**: Red for alert

### Breakpoints
- **Desktop** (> 768px): Sidebar always visible
- **Tablet/Mobile** (≤ 768px): Sidebar hidden by default, toggle to show
- **Extra Small** (≤ 576px): Optimized button and text sizes

## CSS Classes Used

### Bootstrap Classes
- `navbar`, `navbar-dark`, `bg-dark`, `sticky-top`
- `container-fluid`
- `btn`, `btn-outline-light`, `btn-outline-danger`, `btn-sm`
- `d-flex`, `align-items-center`, `me-3`, `mt-auto`
- `nav`, `nav-item`, `nav-link`, `nav-text`
- `text-light`, `text-danger`

### Custom Classes
- `.sidebar` - Main sidebar container
- `.sidebar-open` - Active state class
- `.main-content` - Content area
- `.nav-link` - Sidebar links
- `.navbar-brand` - App branding

## Dependencies

Required packages (already installed):
- `@angular/common` ^21.0.0
- `@angular/router` ^21.0.0
- `@angular/core` ^21.0.0
- `bootstrap` ^5.3.8
- `font-awesome` ^4.7.0

## Next Steps

1. **Configure Routes**: Update `app.routes.ts` with your application routes
2. **Setup Authentication**: Implement login logic in your login component
3. **Customize Navigation**: Add/remove navigation links as needed
4. **Styling**: Modify colors and styling to match your brand guidelines

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The sidebar remains open on desktop and closes on mobile by default
- User must be logged in and have `loggedInUser` in localStorage to see username
- All navigation links use Angular's `routerLink` for SPA navigation
- The component is fully responsive with smooth animations
- Font-Awesome icons load from the installed package
- Bootstrap 5 utility classes provide responsive spacing and alignment
