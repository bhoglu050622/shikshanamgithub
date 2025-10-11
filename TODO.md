# Mobile Responsiveness Improvement Plan

This document outlines the plan to improve the mobile responsiveness of the Shikshanam website.

## Phase 1: Global Components

- [ ] **Header (`components/Header.tsx`)**
    - **Issues to check:**
        - Navigation links should be easily tappable.
        - The logo should not be too large or too small.
        - Search bar and other icons should be properly aligned and sized.
        - Check for horizontal overflow.

- [ ] **Footer (`components/Footer.tsx`)**
    - **Issues to check:**
        - Links in the footer should be readable and tappable.
        - The layout should stack vertically on smaller screens.
        - Social media icons should be visible and correctly sized.

- [ ] **Navigation (`components/navigation/MegaMenu.tsx` and `components/mobile/MobileNavigation.tsx`)**
    - **Issues to check:**
        - The mega menu should be replaced with a mobile-friendly navigation drawer or accordion.
        - The mobile navigation should be easy to open and close.
        - Links within the mobile navigation should be easily tappable.

- [ ] **Main Layout (`app/layout.tsx`)**
    - **Issues to check:**
        - Ensure the main layout does not have any fixed widths that could cause horizontal overflow.
        - Check for any padding or margin issues that affect the overall layout on mobile devices.

## Phase 2: Key Pages

- [ ] **Homepage (`app/page.tsx`)**
    - **Issues to check:**
        - The hero section (`components/sections/Hero.tsx`) should be responsive, with text and images scaling correctly.
        - The featured courses slider (`components/sections/FeaturedCoursesSlider.tsx`) should be swipeable on mobile devices.
        - All sections should stack vertically and be readable on small screens.

- [ ] **Courses Page (`app/courses/page.tsx`)**
    - **Issues to check:**
        - The course grid should be responsive, with the number of columns adjusting to the screen size.
        - Course cards (`components/ui/card.tsx`) should be readable and tappable.
        - Filters and sorting options should be easily accessible on mobile.

- [ ] **Free Courses Page (`app/free-courses/page.tsx`)**
    - **Issues to check:**
        - Similar to the courses page, ensure the layout is responsive and easy to use on mobile devices.

- [ ] **Individual Course Page (`app/courses/[slug]/page.tsx`)**
    - **Issues to check:**
        - The course content should be readable, with appropriate font sizes and line spacing.
        - Videos and images should scale correctly.
        - The "Enroll Now" button should be prominently displayed and easily tappable.

- [ ] **Blog Page (`app/blogs/sanskrit/page.tsx`)**
    - **Issues to check:**
        - The blog grid should be responsive.
        - Blog cards (`components/blog/BlogCard.tsx`) should be easy to read and tap.
        - The blog content itself should be readable on small screens.

## Phase 3: General UI Components

- [ ] **Cards (`components/ui/card.tsx`)**
    - **Issues to check:**
        - Ensure cards are responsive and stack correctly in different layouts.
        - Check for consistent padding and margin on all screen sizes.

- [ ] **Buttons (`components/ui/button.tsx`)**
    - **Issues to check:**
        - Buttons should be large enough to be easily tapped on mobile devices.
        - Ensure button text is not truncated on smaller screens.

- [ ] **Forms and Inputs (`components/ui/input.tsx`, `components/ui/textarea.tsx`, etc.)**
    - **Issues to check:**
        - Form inputs should be easily tappable and readable.
        - Ensure forms do not cause horizontal overflow.

## Phase 4: Testing and Refinement

- [ ] **Cross-browser and Cross-device Testing**
    - **Actions:**
        - Test the website on a variety of real devices (iOS and Android).
        - Use browser developer tools to simulate different screen sizes.
        - Test on different browsers (Chrome, Firefox, Safari).

- [ ] **Performance Optimization**
    - **Actions:**
        - Optimize images for mobile devices.
        - Ensure that responsive CSS is loaded efficiently.
        - Check for any performance bottlenecks on mobile.