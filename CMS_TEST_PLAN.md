# CMS End-to-End Testing Plan

## Testing Strategy

### Test Levels
1. **Level 1**: Page-level CMS editors (About, Contact, Schools, Donation)
2. **Level 2**: School-specific CMS editors (Sanskrit, Darshana, Self-Help)
3. **Level 3**: Individual item editors (Course, Package)
4. **Level 4**: Bulk code editors (All Courses, All Packages)

### Test Types
- **Read Test**: Load data and verify structure
- **Update Test**: Make changes and verify save
- **Validation Test**: Test invalid JSON handling
- **Revert Test**: Restore original data

### Success Criteria
- ✅ Page loads without errors
- ✅ Data displays correctly
- ✅ JSON is valid and editable
- ✅ Changes save successfully
- ✅ Invalid JSON is rejected
- ✅ Can revert to original state

---

## Test Execution Plan

### Phase 1: Page-Level CMS
1. Test `/cms/about` - Total Content tab
2. Test `/cms/contact` - Total Content tab
3. Test `/cms/schools` - Total Content tab

### Phase 2: School-Specific CMS
4. Test `/cms/sanskrit-school` - Total Content tab
5. Test `/cms/darshana-school` - Total Content tab
6. Test `/cms/self-help-school` - Total Content tab

### Phase 3: Donation (Code-Only)
7. Test `/cms/donation` - Code-only editor

### Phase 4: Individual Editors
8. Test `/cms/course/tantra-darshan` - Individual course
9. Test `/cms/course/yoga-advanced` - Another course
10. Test `/cms/package/yoga-philosophy-complete` - Individual package
11. Test `/cms/package/ayurveda-wellness` - Another package

### Phase 5: Bulk Editors
12. Test `/cms/courses/code-editor` - All courses JSON
13. Test `/cms/packages/code-editor` - All packages JSON

---

## Test Cases

### Test Case Template
```
Test ID: TC-XXX
Page: /cms/xxx
Action: Load → Edit → Save → Verify
Expected: Success
Actual: [Result]
Status: PASS/FAIL
Reason: [If fail]
```

---

## Backup Strategy
Before testing, will backup:
- Current CMS data state
- Frontend data files
- API route configurations

After testing, will:
- Restore all original data
- Verify frontend matches original state
- Clean up test data

---

**Test Start Time**: [To be recorded]
**Test End Time**: [To be recorded]
**Total Tests**: 13
**Expected Duration**: ~15-20 minutes

