# products-api-assessment

A simple end-to-end testing setup using **Cypress** with **TypeScript**.

## ⚙️ Prerequisites

Ensure you have the following installed:

- **Node.js** (v16.x or higher recommended)
- **npm** (bundled with Node.js)

To verify your setup:
~~~bash
node -v
npm -v
~~~

## 🚀 Setup & Run Instructions

### 1. Clone the repository
~~~bash
git clone https://github.com/rodkawaura/products-api-assessment.git
cd products-api-assessment
~~~

### 2. Install dependencies
~~~bash
npm install
~~~

### 3. Open Cypress Test Runner (UI mode)
~~~bash
npx cypress open
~~~


### 4. Run all tests in headless mode
~~~bash
npx cypress run
~~~

### 5. Generate and view an HTML test report
This project uses [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) to generate HTML reports.

After running tests, the report will be available at:
```
cypress/reports/html/index.html
```
To open the report in your browser:
~~~bash
start cypress/reports/html/index.html
~~~

---
That’s it — after cloning and installing dependencies, you’re ready to run the tests and view HTML reports.
