require('dotenv').config();
let fetch;
import('node-fetch').then(module => {
  fetch = module.default;
  runTests();
});

const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const BASE_URL = 'http://localhost:3000'; // Assuming the app runs on port 3000

async function getContentFiles() {
  const response = await fetch(`${BASE_URL}/api/cms/editor`);
  const data = await response.json();
  if (!data.success) {
    throw new Error('Failed to get content files.');
  }
  return data.files;
}

async function testEditor(file) {
  console.log(`Testing editor for: ${file}`);

  // 1. Fetch the current content
  const contentResponse = await fetch(`${BASE_URL}/api/cms/editor?file=${file}`);
  const contentData = await contentResponse.json();
  if (!contentData.success) {
    console.error(`  Error fetching content for ${file}: ${contentData.error}`);
    return { file, success: false, error: `Failed to fetch content: ${contentData.error}` };
  }

  // 2. Make a small change to the content
  const newContent = { ...contentData.content, 'test-edit': `This is a test edit from ${new Date().toISOString()}` };
  const commitMessage = `CMS Test: Update ${file}`;

  // 3. Send a "save" request
  const saveResponse = await fetch(`${BASE_URL}/api/cms/git`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'save',
      file: file,
      content: newContent,
      commitMessage: commitMessage,
    }),
  });

  const result = await saveResponse.json();

  if (saveResponse.ok && result.branch) {
    console.log(`  Success! Saved to branch: ${result.branch}`);
    return { file, success: true, branch: result.branch };
  } else {
    console.error(`  Error saving changes for ${file}: ${result.error}`);
    return { file, success: false, error: result.error || 'Failed to save via Git API' };
  }
}

async function runTests() {
  console.log('--- Starting CMS Editor Tests ---');
  const contentFiles = await getContentFiles();
  const report = [];

  for (const file of contentFiles) {
    const result = await testEditor(file);
    report.push(result);
  }

  console.log('\n--- CMS Editor Test Report ---');
  report.forEach(result => {
    if (result.success) {
      console.log(`✅ ${result.file}: Successfully saved to branch ${result.branch}`);
    } else {
      console.log(`❌ ${result.file}: Failed - ${result.error}`);
    }
  });
  console.log('---------------------------------');
}

// runTests is now called after the dynamic import resolves