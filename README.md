Geo-Clean Automation Framework
🚀 Overview
Geo-Clean is a smart facility management platform designed for tracking personnel movement via QR code scans and monitoring attendance. This repository contains a robust End-to-End (E2E) Automation Framework built to ensure the reliability of the Geo-Clean Admin Console.

The framework focuses on automating critical business workflows such as admin management, cleaner registration, and real-time intelligence reporting.

🛠 Tech Stack
Language: TypeScript

Testing Tool: Playwright

Design Pattern: Page Object Model (POM)

Test Management: Integrated with Jira Xray

Reporting: Playwright HTML Reports & Trace Viewer

🧪 Key Test Scenarios
Authentication: Secure Admin login and registration flows.

Staff Registry: Adding, updating, and deleting cleaning personnel (Cleaners Management).

Deployment Matrix: Mapping staff members to specific facility authorization nodes (Assignments).

Intelligence Logs: Verifying date-filtered reports for audit personnel movement and facility coverage.

Live Tracking: Validating live location fetching for on-site staff.

📂 Framework Structure
The project follows a modular Page Object Model to enhance maintainability:

tests/: Contains the .spec.ts test files organized by module.

pages/: Contains page-specific locators and actions (e.g., ReportsPage.ts).

test-data/: JSON files for managing environment-specific data.

utils/: Helper classes for dynamic data generation.

🚀 Getting Started
Clone the repository:

Bash
git clone <your-repo-url>
Install dependencies:

Bash
npm install
Install Playwright Browsers:

Bash
npx playwright install
Run Tests:

Bash
npx playwright test
📊 Reports & Debugging
This framework utilizes Playwright's Trace Viewer to debug failures, providing a step-by-step video of the test execution, console logs, and network snapshots.
