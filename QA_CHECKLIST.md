# 🔍 Course Landing Pages - QA Testing Checklist

## Overview
This document provides a comprehensive QA testing checklist for all 10 revamped course landing pages.

---

## ✅ Automated Checks (COMPLETED)

### Code Quality
- ✅ **Linting**: Zero errors across all files
- ✅ **TypeScript**: 100% type-safe code
- ✅ **Build**: No build errors or warnings
- ✅ **Imports**: All components properly imported
- ✅ **Syntax**: Valid JSX/TSX syntax throughout

### File Structure
- ✅ **Shared Components**: 10 components created and exported
- ✅ **Section Templates**: 7 templates created and exported
- ✅ **Course Data**: 10 courseData.ts files created
- ✅ **Page Files**: 10 page.tsx files revamped
- ✅ **Type Definitions**: Complete TypeScript interfaces

---

## 📋 Manual Testing Required

### 1. Cross-Browser Testing

#### Desktop Browsers

**Chrome (Latest)**
- [ ] Page loads correctly
- [ ] All animations work smoothly
- [ ] Hover effects function properly
- [ ] CTAs are clickable
- [ ] Images load correctly
- [ ] Fonts render properly
- [ ] Colors display accurately
- [ ] Responsive breakpoints work

**Firefox (Latest)**
- [ ] Page loads correctly
- [ ] CSS Grid layouts render properly
- [ ] Custom properties work
- [ ] Animations perform well
- [ ] All interactions functional

**Safari (Latest)**
- [ ] Page loads correctly
- [ ] Webkit-specific issues resolved
- [ ] Backdrop-filter (glass-morphism) works
- [ ] Smooth scroll behavior works
- [ ] Touch interactions on trackpad

**Edge (Latest)**
- [ ] Page loads correctly
- [ ] All features functional
- [ ] Performance is acceptable
- [ ] No Edge-specific bugs

#### Mobile Browsers

**iOS Safari**
- [ ] iPhone 12/13/14 Pro (390x844)
- [ ] iPhone SE (375x667)
- [ ] iPad (768x1024)
- [ ] Landscape orientations
- [ ] Touch interactions work
- [ ] Pinch-to-zoom disabled appropriately
- [ ] Safe areas respected

**Chrome Mobile (Android)**
- [ ] Various screen sizes
- [ ] Touch interactions work
- [ ] Scroll performance smooth
- [ ] No layout shifts

---

### 2. Responsive Design Validation

#### Breakpoints to Test

**Mobile** (320px - 767px)
- [ ] 320px (Small phones)
- [ ] 375px (iPhone standard)
- [ ] 414px (Large phones)
- [ ] Single column layouts
- [ ] Touch-friendly buttons (44px min)
- [ ] Readable font sizes
- [ ] No horizontal scroll

**Tablet** (768px - 1023px)
- [ ] 768px (iPad portrait)
- [ ] 1024px (iPad landscape)
- [ ] 2-column layouts where appropriate
- [ ] Optimal spacing

**Desktop** (1024px+)
- [ ] 1280px (Small desktop)
- [ ] 1440px (Standard desktop)
- [ ] 1920px (Large desktop)
- [ ] Max-width containers working
- [ ] 3-4 column grids functioning

---

### 3. Component Testing

#### Per Course Page

**Hero Section**
- [ ] Background image loads
- [ ] Stats display correctly
- [ ] CTA button works
- [ ] Responsive on mobile
- [ ] Proper theme colors

**Highlights Grid**
- [ ] Icons render correctly
- [ ] 2/3/4 column layouts work
- [ ] Cards have proper spacing
- [ ] Hover effects smooth
- [ ] Mobile: single column

**Syllabus Accordion**
- [ ] Opens/closes smoothly
- [ ] Default open section works
- [ ] Duration displays correctly
- [ ] Topics list formatted properly
- [ ] Mobile-friendly

**Instructor Section**
- [ ] Bio displays correctly
- [ ] Specializations render
- [ ] Layout responsive

**Outcomes Grid**
- [ ] Cards display in grid
- [ ] Icons aligned properly
- [ ] Text readable
- [ ] Responsive layout

**Testimonials**
- [ ] Ratings display (stars)
- [ ] Cards layout properly
- [ ] Names and roles visible
- [ ] Mobile: scrollable or stacked

**FAQ Accordion**
- [ ] Questions expand/collapse
- [ ] Icons rotate on toggle
- [ ] Smooth animations
- [ ] Content readable

**Final CTA**
- [ ] Button prominent and clickable
- [ ] Badges display properly
- [ ] Background gradient works
- [ ] Mobile: full width

---

### 4. Theme Testing

Test each course with its assigned theme:

**Philosophy Theme** (Burgundy & Gold)
- [ ] Yoga Darshan
- [ ] Advaita Vedanta
- [ ] Nyaya Darshan
- [ ] Vaisheshik Darshan
- [ ] Tantra Darshan

**Upanishad Theme** (Gold & Amber)
- [ ] Isha Upanishad
- [ ] Prashna Upanishad

**Sanskrit Theme** (Teal & Saffron)
- [ ] Sanskrit Course

**Practical Theme** (Blue & Emerald)
- [ ] Chanakya Code

**Advanced Theme** (Indigo & Purple)
- [ ] Yoga Advanced

**Verify for each:**
- [ ] Primary colors apply correctly
- [ ] Secondary colors apply correctly
- [ ] Hover states use theme colors
- [ ] Backgrounds use theme gradients
- [ ] Badge colors match theme

---

### 5. Accessibility Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible (2px outline)
- [ ] Enter/Space activate buttons
- [ ] Escape closes accordions
- [ ] No keyboard traps
- [ ] Logical tab order

#### Screen Reader Testing

**NVDA (Windows)** or **JAWS**
- [ ] Page structure announced correctly
- [ ] Headings hierarchy logical (h1 → h2 → h3)
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] Buttons have clear labels
- [ ] Form controls labeled
- [ ] ARIA labels present where needed

**VoiceOver (macOS/iOS)**
- [ ] All content accessible
- [ ] Landmarks identified
- [ ] Lists announced correctly
- [ ] Interactive elements identified

#### Color Contrast
- [ ] Body text: 4.5:1 minimum
- [ ] Large text (18px+): 3:1 minimum
- [ ] UI components: 3:1 minimum
- [ ] Focus indicators: 3:1 minimum

Use tools:
- [ ] WebAIM Contrast Checker
- [ ] Chrome DevTools Contrast
- [ ] axe DevTools

#### Other Accessibility
- [ ] No flashing content (seizure risk)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Zoom to 200% works without loss
- [ ] Text spacing adjustable
- [ ] Color is not sole information carrier

---

### 6. Performance Testing

#### Lighthouse Audit (Chrome DevTools)

Run for each course page:

**Targets:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

**Check:**
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Time to Interactive (TTI) < 3.8s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Total Blocking Time (TBT) < 200ms

#### Page Load Performance
- [ ] Total page size < 3MB
- [ ] Image sizes optimized
- [ ] CSS bundled and minified
- [ ] JS bundled and code-split
- [ ] Fonts loaded efficiently
- [ ] No render-blocking resources

#### Runtime Performance
- [ ] Smooth scrolling (60fps)
- [ ] Animations smooth (60fps)
- [ ] Hover effects instant
- [ ] Accordion toggles smooth
- [ ] No janky interactions
- [ ] Memory usage reasonable

---

### 7. Content & Copy Testing

#### Per Course Page

**Accuracy**
- [ ] Course title correct
- [ ] Pricing accurate
- [ ] Duration/sessions correct
- [ ] Syllabus matches course content
- [ ] Instructor details accurate
- [ ] FAQs relevant to course

**Consistency**
- [ ] Tone and voice consistent
- [ ] Terminology consistent
- [ ] Formatting consistent
- [ ] Links all valid
- [ ] No placeholder text (Lorem Ipsum)

**SEO**
- [ ] Meta title optimized
- [ ] Meta description compelling
- [ ] H1 tag present and unique
- [ ] Heading hierarchy logical
- [ ] Alt text for images
- [ ] Structured data (JSON-LD)

---

### 8. Functional Testing

#### CTAs & Buttons
- [ ] "Enroll Now" goes to checkout
- [ ] Checkout links include correct course ID
- [ ] Secondary CTAs work
- [ ] External links open in new tab
- [ ] No broken links

#### Forms (if any)
- [ ] Input validation works
- [ ] Error messages clear
- [ ] Success messages display
- [ ] Form submission works

#### Navigation
- [ ] Header navigation works
- [ ] Footer links functional
- [ ] Breadcrumbs (if present)
- [ ] Back button works correctly

#### Images & Media
- [ ] All images load
- [ ] Lazy loading works
- [ ] Alt text present
- [ ] Fallbacks for failed loads
- [ ] Videos (if any) play correctly

---

### 9. Integration Testing

#### Data Loading
- [ ] courseData.ts imports correctly
- [ ] All course metadata displays
- [ ] Stats render properly
- [ ] Testimonials load
- [ ] FAQs populate

#### Component Integration
- [ ] Shared components work in all pages
- [ ] Templates render correctly
- [ ] Layout wrapper functions properly
- [ ] Theme switching works

#### Third-party Integrations
- [ ] Analytics tracking (if present)
- [ ] Payment gateway links work
- [ ] Social sharing (if present)
- [ ] Chat widget (if present)

---

### 10. User Experience Testing

#### Visual Design
- [ ] Professional appearance
- [ ] Consistent branding
- [ ] Appropriate color usage
- [ ] Readable typography
- [ ] Sufficient white space
- [ ] Visual hierarchy clear

#### Content Flow
- [ ] Logical section order
- [ ] Clear value proposition
- [ ] Trust indicators visible
- [ ] Social proof present
- [ ] CTAs well-placed
- [ ] Scannable content

#### Engagement
- [ ] Content compelling
- [ ] Interactive elements engaging
- [ ] Animations enhance (not distract)
- [ ] Loading states smooth
- [ ] Error states helpful

---

## 🚀 Testing Tools & Resources

### Browser Testing
- **BrowserStack**: Cross-browser testing platform
- **LambdaTest**: Cloud-based browser testing
- **Chrome DevTools**: Device emulation
- **Firefox Developer Tools**: Responsive design mode

### Accessibility Testing
- **axe DevTools**: Automated accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Automated audits
- **NVDA**: Free screen reader (Windows)
- **VoiceOver**: Built-in screen reader (macOS)

### Performance Testing
- **Lighthouse**: Chrome DevTools
- **WebPageTest**: Detailed performance analysis
- **GTmetrix**: Page speed insights
- **Chrome DevTools Performance**: Frame rendering

### Validation Tools
- **W3C Validator**: HTML validation
- **CSS Validator**: CSS validation
- **Link Checker**: Broken link detection
- **Responsive Design Checker**: Multiple screen sizes

---

## 📊 Test Results Template

### Course: [Course Name]

| Test Category | Status | Notes |
|---------------|--------|-------|
| Chrome Desktop | ⏳ | |
| Firefox Desktop | ⏳ | |
| Safari Desktop | ⏳ | |
| Mobile iOS | ⏳ | |
| Mobile Android | ⏳ | |
| Responsive (320px) | ⏳ | |
| Responsive (768px) | ⏳ | |
| Responsive (1920px) | ⏳ | |
| Keyboard Nav | ⏳ | |
| Screen Reader | ⏳ | |
| Color Contrast | ⏳ | |
| Lighthouse Score | ⏳ | P: __ A: __ BP: __ SEO: __ |
| Content Accuracy | ⏳ | |
| CTAs Functional | ⏳ | |
| Theme Applied | ⏳ | |

**Legend**: ⏳ Pending | ✅ Passed | ❌ Failed | ⚠️ Issue Found

---

## 🐛 Bug Tracking Template

### Bug Report

**Course**: [Course Name]  
**Browser**: [Browser & Version]  
**Device**: [Desktop/Mobile, Screen Size]  
**Severity**: [Critical / High / Medium / Low]

**Issue Description**:
[Detailed description]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happens]

**Screenshot/Video**:
[If applicable]

**Fix Priority**:
[Immediate / Next Sprint / Backlog]

---

## ✅ Final Approval Checklist

Before marking QA as complete:

- [ ] All 10 courses tested in major browsers
- [ ] Mobile testing completed on iOS and Android
- [ ] Accessibility audit passed for all pages
- [ ] Lighthouse scores meet targets (90+)
- [ ] No critical or high-severity bugs
- [ ] Content accuracy verified
- [ ] All CTAs functional
- [ ] Theme colors correct for each course
- [ ] Performance acceptable (<3s load time)
- [ ] User acceptance testing completed
- [ ] Stakeholder approval received

---

## 📝 Notes

### Testing Environment
- **Local Dev**: http://localhost:3000
- **Staging**: [Staging URL if available]
- **Production**: https://shikshanam.com

### Test Users
- **Admin**: [Credentials if needed]
- **Student**: [Test student account]

### Known Limitations
- Some animations may vary slightly across browsers
- Glass-morphism effects require modern browsers
- IE11 not supported (by design)

---

## 🎯 Next Steps After QA

1. **Document Issues**: Log all bugs in tracking system
2. **Prioritize Fixes**: Critical → High → Medium → Low
3. **Fix & Retest**: Address issues and verify fixes
4. **Stakeholder Review**: Present to team for approval
5. **Deploy to Staging**: Test in staging environment
6. **User Acceptance Testing**: Beta users test
7. **Production Deployment**: Launch revamped pages
8. **Monitor**: Track analytics and user feedback

---

*QA Checklist Version: 1.0*  
*Last Updated: October 12, 2025*  
*Project: Shikshanam Course Landing Pages Revamp*

