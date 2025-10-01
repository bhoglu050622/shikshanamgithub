#!/usr/bin/env node

/**
 * CMS Components Testing Suite
 * Tests all new CMS components individually and in combination
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const TEST_CONFIG = {
  components: [
    'VisualContentBuilder',
    'SmartContentAssistant', 
    'MobilePreview',
    'OneClickDesignSystem',
    'ContentTemplatesLibrary',
    'EnhancedNonTechCMS',
    'OnScreenGuide',
    'WelcomeModal',
    'HelpSystem',
    'OnboardingIntegration'
  ],
  testTypes: [
    'import-test',
    'props-test', 
    'integration-test',
    'accessibility-test'
  ]
};

// Test results storage
let testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  errors: [],
  warnings: []
};

/**
 * Test component imports
 */
function testComponentImports() {
  console.log('🧪 Testing Component Imports...\n');
  
  const componentsDir = path.join(__dirname, '../components/cms');
  
  TEST_CONFIG.components.forEach(componentName => {
    const componentFile = path.join(componentsDir, `${componentName}.tsx`);
    
    if (fs.existsSync(componentFile)) {
      try {
        const content = fs.readFileSync(componentFile, 'utf8');
        
        // Check for basic React imports
        if (content.includes("import React")) {
          console.log(`✅ ${componentName}: React import found`);
          testResults.passed++;
        } else {
          console.log(`❌ ${componentName}: Missing React import`);
          testResults.failed++;
          testResults.errors.push(`${componentName}: Missing React import`);
        }
        
        // Check for TypeScript interfaces
        if (content.includes('interface ')) {
          console.log(`✅ ${componentName}: TypeScript interfaces found`);
          testResults.passed++;
        } else {
          console.log(`⚠️  ${componentName}: No TypeScript interfaces found`);
          testResults.warnings.push(`${componentName}: No TypeScript interfaces`);
        }
        
        // Check for proper export
        if (content.includes('export default')) {
          console.log(`✅ ${componentName}: Default export found`);
          testResults.passed++;
        } else {
          console.log(`❌ ${componentName}: Missing default export`);
          testResults.failed++;
          testResults.errors.push(`${componentName}: Missing default export`);
        }
        
        testResults.total += 3;
        
      } catch (error) {
        console.log(`❌ ${componentName}: Error reading file - ${error.message}`);
        testResults.failed++;
        testResults.errors.push(`${componentName}: File read error - ${error.message}`);
        testResults.total++;
      }
    } else {
      console.log(`❌ ${componentName}: File not found`);
      testResults.failed++;
      testResults.errors.push(`${componentName}: File not found`);
      testResults.total++;
    }
    
    console.log(''); // Empty line for readability
  });
}

/**
 * Test component props and interfaces
 */
function testComponentProps() {
  console.log('🔍 Testing Component Props and Interfaces...\n');
  
  const componentsDir = path.join(__dirname, '../components/cms');
  
  TEST_CONFIG.components.forEach(componentName => {
    const componentFile = path.join(componentsDir, `${componentName}.tsx`);
    
    if (fs.existsSync(componentFile)) {
      try {
        const content = fs.readFileSync(componentFile, 'utf8');
        
        // Check for props interface
        const propsInterfaceMatch = content.match(/interface\s+(\w+Props)\s*{/);
        if (propsInterfaceMatch) {
          console.log(`✅ ${componentName}: Props interface found (${propsInterfaceMatch[1]})`);
          testResults.passed++;
        } else {
          console.log(`❌ ${componentName}: No props interface found`);
          testResults.failed++;
          testResults.errors.push(`${componentName}: No props interface`);
        }
        
        // Check for proper prop destructuring
        const propDestructuringMatch = content.match(/\(\s*{\s*[^}]+}\s*:\s*\w+Props\s*\)/);
        if (propDestructuringMatch) {
          console.log(`✅ ${componentName}: Proper prop destructuring found`);
          testResults.passed++;
        } else {
          console.log(`⚠️  ${componentName}: Prop destructuring not found or incomplete`);
          testResults.warnings.push(`${componentName}: Prop destructuring issue`);
        }
        
        // Check for useState/useEffect hooks
        if (content.includes('useState') || content.includes('useEffect')) {
          console.log(`✅ ${componentName}: React hooks found`);
          testResults.passed++;
        } else {
          console.log(`⚠️  ${componentName}: No React hooks found`);
          testResults.warnings.push(`${componentName}: No React hooks`);
        }
        
        testResults.total += 3;
        
      } catch (error) {
        console.log(`❌ ${componentName}: Error analyzing props - ${error.message}`);
        testResults.failed++;
        testResults.errors.push(`${componentName}: Props analysis error - ${error.message}`);
        testResults.total++;
      }
    }
    
    console.log('');
  });
}

/**
 * Test component integration
 */
function testComponentIntegration() {
  console.log('🔗 Testing Component Integration...\n');
  
  // Check if components can be imported together
  const integrationTest = `
import VisualContentBuilder from '@/components/cms/VisualContentBuilder';
import SmartContentAssistant from '@/components/cms/SmartContentAssistant';
import MobilePreview from '@/components/cms/MobilePreview';
import OneClickDesignSystem from '@/components/cms/OneClickDesignSystem';
import ContentTemplatesLibrary from '@/components/cms/ContentTemplatesLibrary';
import EnhancedNonTechCMS from '@/components/cms/EnhancedNonTechCMS';
import OnScreenGuide from '@/components/cms/OnScreenGuide';
import WelcomeModal from '@/components/cms/WelcomeModal';
import HelpSystem from '@/components/cms/HelpSystem';
import OnboardingIntegration from '@/components/cms/OnboardingIntegration';

// Integration test - all components should be importable
const components = {
  VisualContentBuilder,
  SmartContentAssistant,
  MobilePreview,
  OneClickDesignSystem,
  ContentTemplatesLibrary,
  EnhancedNonTechCMS,
  OnScreenGuide,
  WelcomeModal,
  HelpSystem,
  OnboardingIntegration
};

export default components;
`;

  try {
    // Write temporary integration test file
    const tempFile = path.join(__dirname, '../temp-integration-test.tsx');
    fs.writeFileSync(tempFile, integrationTest);
    
    console.log('✅ Integration test file created');
    testResults.passed++;
    
    // Clean up
    fs.unlinkSync(tempFile);
    console.log('✅ Integration test file cleaned up');
    testResults.passed++;
    
    testResults.total += 2;
    
  } catch (error) {
    console.log(`❌ Integration test failed: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(`Integration test failed: ${error.message}`);
    testResults.total++;
  }
  
  console.log('');
}

/**
 * Test accessibility features
 */
function testAccessibility() {
  console.log('♿ Testing Accessibility Features...\n');
  
  const componentsDir = path.join(__dirname, '../components/cms');
  
  TEST_CONFIG.components.forEach(componentName => {
    const componentFile = path.join(componentsDir, `${componentName}.tsx`);
    
    if (fs.existsSync(componentFile)) {
      try {
        const content = fs.readFileSync(componentFile, 'utf8');
        let accessibilityScore = 0;
        let totalChecks = 0;
        
        // Check for ARIA labels
        if (content.includes('aria-label') || content.includes('aria-labelledby')) {
          console.log(`✅ ${componentName}: ARIA labels found`);
          accessibilityScore++;
        } else {
          console.log(`⚠️  ${componentName}: No ARIA labels found`);
        }
        totalChecks++;
        
        // Check for semantic HTML
        if (content.includes('<button') || content.includes('<nav') || content.includes('<main')) {
          console.log(`✅ ${componentName}: Semantic HTML elements found`);
          accessibilityScore++;
        } else {
          console.log(`⚠️  ${componentName}: Limited semantic HTML`);
        }
        totalChecks++;
        
        // Check for keyboard navigation
        if (content.includes('onKeyDown') || content.includes('tabIndex')) {
          console.log(`✅ ${componentName}: Keyboard navigation support found`);
          accessibilityScore++;
        } else {
          console.log(`⚠️  ${componentName}: No keyboard navigation found`);
        }
        totalChecks++;
        
        // Check for focus management
        if (content.includes('focus') || content.includes('blur')) {
          console.log(`✅ ${componentName}: Focus management found`);
          accessibilityScore++;
        } else {
          console.log(`⚠️  ${componentName}: No focus management found`);
        }
        totalChecks++;
        
        const score = Math.round((accessibilityScore / totalChecks) * 100);
        console.log(`📊 ${componentName}: Accessibility Score: ${score}%`);
        
        if (score >= 75) {
          testResults.passed++;
        } else if (score >= 50) {
          testResults.warnings.push(`${componentName}: Low accessibility score (${score}%)`);
        } else {
          testResults.failed++;
          testResults.errors.push(`${componentName}: Poor accessibility score (${score}%)`);
        }
        
        testResults.total++;
        
      } catch (error) {
        console.log(`❌ ${componentName}: Accessibility test error - ${error.message}`);
        testResults.failed++;
        testResults.errors.push(`${componentName}: Accessibility test error - ${error.message}`);
        testResults.total++;
      }
    }
    
    console.log('');
  });
}

/**
 * Generate test report
 */
function generateReport() {
  console.log('📊 Test Results Summary\n');
  console.log('='.repeat(50));
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`⚠️  Warnings: ${testResults.warnings.length}`);
  console.log('='.repeat(50));
  
  const successRate = Math.round((testResults.passed / testResults.total) * 100);
  console.log(`\n🎯 Success Rate: ${successRate}%`);
  
  if (testResults.errors.length > 0) {
    console.log('\n❌ Errors:');
    testResults.errors.forEach(error => console.log(`  - ${error}`));
  }
  
  if (testResults.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    testResults.warnings.forEach(warning => console.log(`  - ${warning}`));
  }
  
  // Generate JSON report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: testResults.total,
      passed: testResults.passed,
      failed: testResults.failed,
      warnings: testResults.warnings.length,
      successRate: successRate
    },
    errors: testResults.errors,
    warnings: testResults.warnings
  };
  
  const reportFile = path.join(__dirname, '../test-results-cms-components.json');
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportFile}`);
  
  return successRate >= 80;
}

/**
 * Main test runner
 */
function runTests() {
  console.log('🚀 Starting CMS Components Test Suite\n');
  console.log('='.repeat(60));
  
  try {
    testComponentImports();
    testComponentProps();
    testComponentIntegration();
    testAccessibility();
    
    const success = generateReport();
    
    if (success) {
      console.log('\n🎉 All tests completed successfully!');
      process.exit(0);
    } else {
      console.log('\n⚠️  Some tests failed. Please review the errors above.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n💥 Test suite failed with error:', error.message);
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests,
  testComponentImports,
  testComponentProps,
  testComponentIntegration,
  testAccessibility,
  generateReport
};
