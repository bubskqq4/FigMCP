#!/usr/bin/env node
/**
 * Test script for the link-to-node-id tool
 * This demonstrates the functionality without needing the full MCP server running
 */

/**
 * Extract node ID from a Figma link
 * Supports formats:
 * - https://www.figma.com/file/FILE_KEY/FILE_NAME?node-id=123-456
 * - https://www.figma.com/design/FILE_KEY/FILE_NAME?node-id=123-456
 * - https://www.figma.com/proto/FILE_KEY/FILE_NAME?node-id=123-456
 * 
 * Converts URL format (123-456) to Figma API format (123:456)
 */
function extractNodeIdFromLink(link) {
    try {
        const url = new URL(link);
        
        // Get node-id parameter from URL
        const nodeIdParam = url.searchParams.get('node-id');
        
        if (!nodeIdParam) {
            throw new Error('No node-id parameter found in the Figma link');
        }
        
        // Convert dash format to colon format (123-456 -> 123:456)
        const nodeId = nodeIdParam.replace(/-/g, ':');
        
        return nodeId;
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Invalid URL format. Please provide a valid Figma link.');
        }
        throw error;
    }
}

// Test cases
const testCases = [
    {
        name: "Valid file link",
        link: "https://www.figma.com/file/abc123/MyDesign?node-id=123-456",
        expected: "123:456"
    },
    {
        name: "Valid design link",
        link: "https://www.figma.com/design/xyz789/AnotherDesign?node-id=789-101",
        expected: "789:101"
    },
    {
        name: "Valid proto link",
        link: "https://www.figma.com/proto/proto123/Prototype?node-id=11-22",
        expected: "11:22"
    },
    {
        name: "Complex node ID",
        link: "https://www.figma.com/file/abc/Design?node-id=1234-5678-9",
        expected: "1234:5678:9"
    },
    {
        name: "Link with additional parameters",
        link: "https://www.figma.com/file/abc/Design?type=design&node-id=99-88&mode=design",
        expected: "99:88"
    },
    {
        name: "Invalid link (no node-id)",
        link: "https://www.figma.com/file/abc123/MyDesign",
        expected: "ERROR"
    },
    {
        name: "Invalid URL",
        link: "not-a-valid-url",
        expected: "ERROR"
    }
];

console.log("🧪 Testing link-to-node-id converter\n");
console.log("=" .repeat(80));

let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
    console.log(`\nTest ${index + 1}: ${testCase.name}`);
    console.log(`Input: ${testCase.link}`);
    
    try {
        const result = extractNodeIdFromLink(testCase.link);
        
        if (testCase.expected === "ERROR") {
            console.log(`❌ FAILED: Expected error but got result: ${result}`);
            failed++;
        } else if (result === testCase.expected) {
            console.log(`✅ PASSED: ${result}`);
            passed++;
        } else {
            console.log(`❌ FAILED: Expected ${testCase.expected}, got ${result}`);
            failed++;
        }
    } catch (error) {
        if (testCase.expected === "ERROR") {
            console.log(`✅ PASSED: Error caught as expected - ${error.message}`);
            passed++;
        } else {
            console.log(`❌ FAILED: Unexpected error - ${error.message}`);
            failed++;
        }
    }
});

console.log("\n" + "=".repeat(80));
console.log(`\n📊 Test Results: ${passed}/${testCases.length} passed, ${failed}/${testCases.length} failed`);

if (failed === 0) {
    console.log("\n🎉 All tests passed!");
    process.exit(0);
} else {
    console.log(`\n⚠️  ${failed} test(s) failed`);
    process.exit(1);
}
