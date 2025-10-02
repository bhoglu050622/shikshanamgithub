# Comprehensive Testing Plan for Shikshanam CMS

## Overview
This document outlines a comprehensive testing plan to verify that the CMS editors, dynamic data system, and course/package pages are working correctly.

## 1. CMS Editor Testing

### 1.1 Course Editor Testing
**Location**: `/cms/courses`

#### Test Cases:
1. **Create New Course**
   - Navigate to `/cms/courses`
   - Click "Add New Course"
   - Fill in all required fields:
     - Course ID: `test-course-001`
     - Title: `Test Course`
     - Subtitle: `A test course for validation`
     - Instructor: `Test Instructor`
     - Price: `₹999`
     - Duration: `2 months`
     - Level: `Beginner`
   - Save the course
   - Verify course appears in the list
   - Verify course data file is created in `/data/` directory

2. **Edit Existing Course**
   - Select an existing course (e.g., `samkhya-darshan`)
   - Modify the title to `Updated Samkhya Darshan`
   - Update the price to `₹3,999`
   - Save changes
   - Verify changes are reflected in the course list
   - Verify course data file is updated

3. **Delete Course**
   - Select a test course
   - Click delete and confirm
   - Verify course is removed from the list
   - Verify course data file is deleted

4. **JSON Editor Testing**
   - Open a course in JSON editor mode
   - Modify JSON directly
   - Save changes
   - Verify JSON is valid and changes are applied

### 1.2 Package Editor Testing
**Location**: `/cms/packages`

#### Test Cases:
1. **Create New Package**
   - Navigate to `/cms/packages`
   - Click "Add New Package"
   - Fill in package details:
     - Package ID: `test-package-001`
     - Title: `Test Package`
     - Description: `A test package for validation`
     - Price: `₹4,999`
     - Duration: `6 months`
   - Add courses to the package
   - Save the package
   - Verify package appears in the list

2. **Edit Existing Package**
   - Select an existing package
   - Modify package details
   - Add/remove courses from package
   - Save changes
   - Verify changes are reflected

3. **Package JSON Editor**
   - Open package in JSON editor
   - Modify JSON structure
   - Validate JSON syntax
   - Save and verify changes

## 2. Dynamic Data System Testing

### 2.1 Course Data API Testing
**Endpoints**: `/api/cms/course/[courseId]`

#### Test Cases:
1. **Fetch Existing Course Data**
   - Test: `GET /api/cms/course/samkhya-darshan`
   - Expected: Returns course data from `/data/samkhya-darshan-course.json`
   - Verify: All fields are present and correctly formatted

2. **Fetch Non-existent Course**
   - Test: `GET /api/cms/course/non-existent-course`
   - Expected: Returns 404 or appropriate error
   - Verify: Error handling works correctly

3. **Update Course Data**
   - Test: `PUT /api/cms/course/samkhya-darshan`
   - Send updated course data
   - Expected: Course data file is updated
   - Verify: Changes are persisted

### 2.2 Package Data API Testing
**Endpoints**: `/api/cms/package/[packageId]`

#### Test Cases:
1. **Fetch Package Data**
   - Test: `GET /api/cms/package/hindu-philosophies-upanishads-bundle`
   - Expected: Returns package data
   - Verify: All fields are present

2. **Update Package Data**
   - Test: `PUT /api/cms/package/hindu-philosophies-upanishads-bundle`
   - Send updated package data
   - Expected: Package data file is updated

## 3. Frontend Page Testing

### 3.1 Course Pages Testing
**Pages to Test**:
- `/courses/samkhya-darshan`
- `/courses/yoga-darshan`
- `/courses/tantra-darshan`
- `/courses/nyaya-darshan`
- `/courses/vaisheshik-darshan`
- `/courses/kashmir-shaivism`

#### Test Cases:
1. **Page Loading**
   - Navigate to each course page
   - Verify page loads without errors
   - Verify loading spinner appears initially
   - Verify course data is displayed correctly

2. **Dynamic Data Integration**
   - Verify course title, price, instructor are displayed
   - Verify features, testimonials, and FAQ sections
   - Verify checkout links are working
   - Test with different course data

3. **Responsive Design**
   - Test on mobile devices
   - Test on tablet devices
   - Test on desktop
   - Verify all elements are properly displayed

### 3.2 Package Pages Testing
**Pages to Test**:
- `/packages/sanskrit-basics`
- `/packages/hindu-philosophies-upanishads-bundle`

#### Test Cases:
1. **Package Information Display**
   - Verify package title, description, price
   - Verify included courses are listed
   - Verify features and benefits
   - Verify testimonials and FAQ

2. **Dynamic Data Integration**
   - Verify package data is loaded dynamically
   - Test with different package configurations
   - Verify fallback data works when API fails

## 4. Data File Validation

### 4.1 Course Data Files
**Files to Validate**:
- `/data/samkhya-darshan-course.json`
- `/data/yoga-darshan-course.json`
- `/data/tantra-darshan-course.json`
- `/data/nyaya-darshan-course.json`
- `/data/vaisheshik-darshan-course.json`
- `/data/kashmir-shaivism-course.json`

#### Validation Criteria:
1. **JSON Structure**
   - Verify JSON is valid
   - Verify all required fields are present
   - Verify data types are correct

2. **Content Quality**
   - Verify course titles are appropriate
   - Verify prices are realistic
   - Verify instructor information is complete
   - Verify testimonials are realistic

### 4.2 Package Data Files
**Files to Validate**:
- `/data/hindu-philosophies-upanishads-bundle-package.json`

#### Validation Criteria:
1. **Package Structure**
   - Verify package information is complete
   - Verify included courses are listed
   - Verify pricing information is correct

2. **Course References**
   - Verify all referenced courses exist
   - Verify course IDs match actual course files

## 5. Integration Testing

### 5.1 CMS to Frontend Integration
#### Test Cases:
1. **Create Course via CMS**
   - Create a new course in CMS
   - Navigate to the course page
   - Verify course data is displayed correctly

2. **Update Course via CMS**
   - Update course data in CMS
   - Refresh course page
   - Verify changes are reflected

3. **Delete Course via CMS**
   - Delete course in CMS
   - Navigate to course page
   - Verify appropriate error handling

### 5.2 API Integration Testing
#### Test Cases:
1. **API Response Times**
   - Measure response times for course data API
   - Measure response times for package data API
   - Verify responses are under 2 seconds

2. **Error Handling**
   - Test with invalid course IDs
   - Test with malformed JSON
   - Verify appropriate error messages

## 6. Performance Testing

### 6.1 Page Load Performance
#### Test Cases:
1. **Initial Page Load**
   - Measure time to first contentful paint
   - Measure time to interactive
   - Verify pages load within 3 seconds

2. **Data Loading Performance**
   - Measure time to load course data
   - Measure time to load package data
   - Verify data loads within 1 second

### 6.2 CMS Performance
#### Test Cases:
1. **CMS Editor Performance**
   - Measure time to open course editor
   - Measure time to save course data
   - Verify operations complete within 2 seconds

## 7. Security Testing

### 7.1 Input Validation
#### Test Cases:
1. **JSON Injection**
   - Test with malicious JSON in course data
   - Verify system handles malformed data gracefully

2. **XSS Prevention**
   - Test with script tags in course content
   - Verify content is properly sanitized

### 7.2 File System Security
#### Test Cases:
1. **File Access**
   - Verify only authorized files can be accessed
   - Test with path traversal attempts

## 8. Browser Compatibility Testing

### 8.1 Desktop Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### 8.2 Mobile Browsers
- Chrome Mobile
- Safari Mobile
- Firefox Mobile

## 9. Accessibility Testing

### 9.1 WCAG Compliance
#### Test Cases:
1. **Keyboard Navigation**
   - Verify all interactive elements are keyboard accessible
   - Test tab order is logical

2. **Screen Reader Compatibility**
   - Test with screen reader software
   - Verify all content is properly announced

3. **Color Contrast**
   - Verify sufficient color contrast ratios
   - Test with color blindness simulators

## 10. Test Execution Schedule

### Phase 1: Basic Functionality (Day 1)
- CMS editor basic operations
- Course data API testing
- Basic page loading tests

### Phase 2: Integration Testing (Day 2)
- CMS to frontend integration
- Dynamic data system testing
- Error handling verification

### Phase 3: Performance & Security (Day 3)
- Performance testing
- Security testing
- Browser compatibility testing

### Phase 4: Accessibility & Final Validation (Day 4)
- Accessibility testing
- Final integration tests
- Documentation updates

## 11. Test Data Requirements

### 11.1 Test Courses
- Create 3 test courses with different configurations
- Include courses with missing data fields
- Include courses with invalid data

### 11.2 Test Packages
- Create 2 test packages
- Include packages with different course combinations
- Test edge cases (empty packages, single course packages)

## 12. Success Criteria

### 12.1 Functional Requirements
- ✅ All CMS operations work correctly
- ✅ All course/package pages load without errors
- ✅ Dynamic data system works for all pages
- ✅ Data persistence works correctly

### 12.2 Performance Requirements
- ✅ Page load times under 3 seconds
- ✅ API response times under 1 second
- ✅ CMS operations complete within 2 seconds

### 12.3 Quality Requirements
- ✅ No console errors
- ✅ All tests pass
- ✅ Code coverage above 80%
- ✅ Accessibility compliance

## 13. Bug Reporting Template

### Template for Bug Reports:
```
**Bug ID**: [Unique identifier]
**Severity**: [Critical/High/Medium/Low]
**Component**: [CMS/Frontend/API]
**Description**: [Clear description of the issue]
**Steps to Reproduce**: [Detailed steps]
**Expected Result**: [What should happen]
**Actual Result**: [What actually happens]
**Environment**: [Browser, OS, etc.]
**Screenshots**: [If applicable]
**Additional Notes**: [Any other relevant information]
```

## 14. Test Automation

### 14.1 Automated Tests
- Unit tests for API endpoints
- Integration tests for CMS operations
- End-to-end tests for critical user flows

### 14.2 Manual Testing
- Exploratory testing
- Usability testing
- Accessibility testing

## 15. Post-Testing Actions

### 15.1 Bug Fixes
- Prioritize bugs by severity
- Fix critical and high-severity bugs
- Re-test after fixes

### 15.2 Documentation Updates
- Update user documentation
- Update API documentation
- Update deployment guides

### 15.3 Performance Optimization
- Optimize slow operations
- Implement caching where appropriate
- Monitor performance metrics

---

## Conclusion

This comprehensive testing plan ensures that all aspects of the Shikshanam CMS system are thoroughly tested. The plan covers functional testing, integration testing, performance testing, security testing, and accessibility testing. Following this plan will help ensure a robust and reliable CMS system.

**Next Steps**:
1. Set up test environment
2. Create test data
3. Execute test cases
4. Document results
5. Fix identified issues
6. Re-test after fixes
7. Deploy to production
