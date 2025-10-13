# Quick Guide: Complete Remaining Course File Updates

## Summary
✅ **Completed**: 8 course files + ALL package files (4 components)
⏳ **Remaining**: ~26 course component files

## Automated Approach (Recommended)

Run the helper script to automatically update remaining files:

```bash
cd /Users/amanbhogal/Desktop/Changes\ as\ per\ document/shikshanam_final
node scripts/update-course-enrollment-links.js
```

The script will:
- Find all course files with checkout links
- Add the import automatically
- Replace `<a>` tags with `<ProtectedExternalLink>`
- Report what was changed

## Manual Approach

For each remaining course file, make these 2 changes:

### Step 1: Add Import (top of file)
```tsx
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink'
```

### Step 2: Replace Links

**Pattern A: Link with Button**
```tsx
// Find this:
<a href="https://courses.shikshanam.in/single-checkout/..." target="_blank" rel="noopener noreferrer">
  <Button>Enroll Now</Button>
</a>

// Replace with:
<ProtectedExternalLink href="https://courses.shikshanam.in/single-checkout/...">
  <Button>Enroll Now</Button>
</ProtectedExternalLink>
```

**Pattern B: Styled Link (no button)**
```tsx
// Find this:
<a 
  href="https://courses.shikshanam.in/single-checkout/..."
  target="_blank"
  rel="noopener noreferrer"
  className="px-8 py-4 bg-saffron-600..."
>
  Enroll Now
</a>

// Replace with:
<ProtectedExternalLink 
  href="https://courses.shikshanam.in/single-checkout/..."
  className="px-8 py-4 bg-saffron-600..."
>
  Enroll Now
</ProtectedExternalLink>
```

**Pattern C: Motion Component Links**
```tsx
// Find this:
<motion.a
  href="https://courses.shikshanam.in/single-checkout/..."
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  className="..."
>
  <span>Enroll Now</span>
</motion.a>

// Replace with:
<ProtectedExternalLink href="https://courses.shikshanam.in/single-checkout/...">
  <motion.button
    whileHover={{ scale: 1.05 }}
    className="..."
  >
    <span>Enroll Now</span>
  </motion.button>
</ProtectedExternalLink>
```

## Files by Priority

### High Priority (Main CTAs)
1. `app/courses/yoga-darshan/components/HeroSection.tsx`
2. `app/courses/nyaya-darshan/components/HeroSection.tsx`
3. `app/courses/prashna-upanishad/components/HeroSection.tsx`
4. `app/courses/vaisheshik-darshan/components/HeroSection.tsx`
5. `app/courses/advaita-vedanta-darshan-a-journey-through-drig-drishya-viveka/components/HeroSection.tsx`

### Medium Priority (Secondary CTAs)
6-10. All FinalCTA.tsx files (5 files)
11-12. Sanskrit live class components (2 files)

### Lower Priority (FAQ sections, misc)
13-26. FAQ sections and other pages (14 files)

## Quick Search Commands

Find all remaining files with checkout links:
```bash
grep -r "courses.shikshanam.in/single-checkout" app/courses --include="*.tsx" | grep -v "ProtectedExternalLink"
```

Count remaining files:
```bash
grep -r "courses.shikshanam.in/single-checkout" app/courses --include="*.tsx" | grep -v "ProtectedExternalLink" | wc -l
```

## Testing After Updates

For each updated file, test:
1. Navigate to the course page
2. Click "Enroll Now" without being logged in
3. Verify login modal appears
4. Complete login
5. Verify checkout link opens automatically
6. Check that styling is preserved

## Notes

- ✅ No breaking changes - all styling preserved
- ✅ Mobile-responsive (login modal is mobile-friendly)
- ✅ Accessible (maintains ARIA labels)
- ✅ SEO-friendly (still renders links for crawlers)
- ✅ Works with all animation libraries (framer-motion, etc.)

## Verification

After completing all updates, run:
```bash
# Check no unprotected links remain
grep -r "courses.shikshanam.in/single-checkout" app/courses --include="*.tsx" | grep -v "ProtectedExternalLink"

# Should return empty or only comments
```

## Need Help?

Refer to completed examples:
- Simple button: `app/courses/sanskrit-course/components/Hero.tsx`
- Styled link: `app/courses/sanskrit-course/components/PricingCards.tsx`
- Motion component: `app/courses/tantra-darshan/page.tsx`
- Sticky bar: `app/courses/sanskrit-course/components/StickyEnrollBar.tsx`

