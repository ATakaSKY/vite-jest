### Vite setup with Jest

## Setup

1. yarn create vite vite-jest  

2. yarn add -D jest @types/jest

3. Add this under scripts in package.json {...scripts,  "test": "jest"}


## Writing tests

1. create a file under src/__tests__/App.test.tsx 

2. Paste below code
    <!-- test('Renders main page correctly', () => {
        expect(1).toBe(1)
    }) -->

3. Run test with "yarn test", should run successfully


# Problems with modules

Add an import at the top of the test file
<!-- import App from "../App"; -->

This will result in error: SyntaxError: Cannot use import statement outside a module

To resolve this, we'll run following steps:

1. Setup jest.config.ts and add transfrom property
<!-- export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
} -->

2. Run yarn test now, it should work


## Working jest with React components

1. yarn add -D @testing-library/react @testing-library/user-event

2. Add render in test file
<!-- import { render } from '@testing-library/react'; -->
<!-- render(<App />) -->

3. This will throw an error saying it can't comprehend logo svg files:
<!-- SyntaxError: Unexpected token '<'
1 | import { useState } from 'react'
    > 2 | import logo from './logo.svg'
        | ^
      3 | import './App.css'
      4 |
      5 | function App() { -->

4. We've to mock images and style files in order for things to work here. Add fileMock.ts under test/__mocks__ folder under root with following content:
<!-- module.exports = 'test-file-stub'; -->

Now map this file with moduleNameMapper in jest config ts file:
 <!-- moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
    } -->

5. This will make images to work but css will still fail. Do following steps for supporting CSS:
<!-- yarn add -D identity-obj-proxy; -->

Add this in jest config:
<!-- moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
       + '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    } -->

6. If you run it now, it will fail with testEnvironment prompt, basically jest needs to understand the running environment. Add the dependency and make changes in jest config:
<!-- yarn add -D jest-environment-jsdom -->
<!-- testEnvironment: "jsdom" -->

7. All tests should work fine now


## Testing State & Interactions

The main interaction we’re going to test is a click event when the user clicks the button and verify that the state has changed.
<!-- // Imports
import { render ,screen } from '@testing-library/react';
import user from "@testing-library/user-event";

// To Test
import App from "../App";

test('Renders main page correctly', async() => {
    // Arrange
    render(<App />)

    // Act
    const buttonCount = await screen.findByRole('button')

    await user.click(buttonCount);
    await user.click(buttonCount);

    // Assert
    expect(buttonCount.innerHTML).toBe('count is 2')
}) -->


## Extending jest further

Now that we have our tests fully working, we might want our test scenarios to be a bit clearer, but creating an element that only appears when the count is greater than 0. We could just identify this by querying the DOM if an element is null, but we’re going to extend things to be clearer using @testing-library/jest-dom. The only issue with this module is that we would need to import it with every test we make, so instead we’re going to import it for all our tests using jest.setup.ts
1. yarn add -D @testing-library/jest-dom

2. Add this in jest.setup.ts
<!-- import '@testing-library/jest-dom/extend-expect'; -->

3. Further add this in jest config ts
<!-- setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'] -->


# Final test file

<!-- // Imports
import { render ,screen } from '@testing-library/react';
import user from "@testing-library/user-event";

// To Test
import App from "../App";

describe('Test App component', () => {
    test('should not find count content if count is 0', async() => {
        // Arrange
        render(<App />)
    
        // Act
        const buttonCount = await screen.findByRole('button')
        
        await user.click(buttonCount);
        await user.click(buttonCount);
    
        // Assert
        expect(buttonCount.innerHTML).toBe('count is: 2')
    })

    test('should properly set count text on button click', async() => {
        // Arrange
        render(<App />)
    
        // Act
        const codeCount = await screen.queryByText(/The count is now:/);
    
        // Assert
        expect(codeCount).not.toBeInTheDocument();

    })
}) -->

