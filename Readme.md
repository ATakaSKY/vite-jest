# Vite setup with Jest

## Setup

1. `yarn create vite vite-jest `

2. `yarn add -D jest @types/jest`

3. Add this under scripts in package.json {...scripts, "test": "jest"}

## Writing tests

1. create a file under src/**tests**/App.test.tsx

2. Paste below code

   ```
    test('Renders main page correctly', () => {
       expect(1).toBe(1)
   })
   ```

3. Run test with "yarn test", should run successfully

# Problems with modules

Add an import at the top of the test file
`import App from "../App";`

This will result in error: SyntaxError: Cannot use import statement outside a module

To resolve this, we'll run following steps:

1. Setup jest.config.ts and add transfrom property

```
 export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
}
```

2. Run yarn test now, it should work

## Working jest with React components

1. `yarn add -D @testing-library/react @testing-library/user-event`

2. Add render in test file
   `import { render } from '@testing-library/react';`
   `render(<App />)`

3. This will throw an error saying it can't comprehend logo svg files:

```
 SyntaxError: Unexpected token '<'
1 | import { useState } from 'react'
    > 2 | import logo from './logo.svg'
        | ^
      3 | import './App.css'
      4 |
      5 | function App() {
```

4. We've to mock images and style files in order for things to work here. Add fileMock.ts under test/**mocks** folder under root with following content:
   `module.exports = 'test-file-stub';`

Now map this file with moduleNameMapper in jest config ts file:

```
 moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
    }
```

5. This will make images to work but css will still fail. Do following steps for supporting CSS:
   `yarn add -D identity-obj-proxy;`

Add this in jest config:

```
moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
       + '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    }
```

6. If you run it now, it will fail with testEnvironment prompt, basically jest needs to understand the running environment. Add the dependency and make changes in jest config:
   `yarn add -D jest-environment-jsdom`
   `testEnvironment: "jsdom"`

7. All tests should work fine now

## Testing State & Interactions

The main interaction we’re going to test is a click event when the user clicks the button and verify that the state has changed.

```
 // Imports
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
})
```

## Extending jest further

Now that we have our tests fully working, we might want our test scenarios to be a bit clearer, but creating an element that only appears when the count is greater than 0. We could just identify this by querying the DOM if an element is null, but we’re going to extend things to be clearer using @testing-library/jest-dom. The only issue with this module is that we would need to import it with every test we make, so instead we’re going to import it for all our tests using jest.setup.ts

1. yarn add -D @testing-library/jest-dom

2. Add this in jest.setup.ts
   `import '@testing-library/jest-dom/extend-expect';`

3. Further add this in jest config ts
   `setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']`

## Final test file

```
 // Imports
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
})
```

## Adding msw for mocking

Visit https://mswjs.io/docs/getting-started, steps are straightforward.

## Setup husky, lint staged

Steps:

- npx husky-init && npm install
- npm install --save-dev lint-staged
- create .prettierrc.json to format with lint-staged
  ```
    {
    "bracketSpacing": true,
    "semi": false,
    "singleQuote": true,
    "trailingComma": "all",
    "printWidth": 100,
    "tabWidth": 2
  }
  ```
- add lint-staged command in package.json
  ```
    "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "npx eslint --fix",
      "npx prettier --write"
    ]
  }
  ```
- configure pre-commit. Sample config:

  ```
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/\_/husky.sh"

    npx lint-staged

    local_branch="$(git rev-parse --abbrev-ref HEAD)"

    valid*branch_regex="^(feature|bugfix|improvement|library|setup|release|hotfix)\/[a-z0-9.*-]+$"

    message="There is something wrong with your branch name. Branch names in this project must adhere to this contract: $valid_branch_regex. Your commit will be rejected. You should rename your branch to a valid name and try again."

    if [[! $local_branch =~ $valid_branch_regex && $local_branch != "main"]]
    then
    echo "$message"
    exit 1
    fi

    exit 0

  ```

## Setup playwright

Simple follow this https://playwright.dev/docs/intro. It basically mentions to run this command:
`npm init playwright@latest`. This sets up the entire config and basic test cases to get up and running here.

## Setup graphql codegen

Follow this guide: https://github.com/ATakaSKY/vite-graphql-codegen/blob/main/README.md to setup code generation for graphql schemas

## Release Please

release-please is a tool for organizing releases by updating changelogs and bumping package versions and creating tags to maintain history as well. It does all this by parsing the commit messages, looking for https://www.conventionalcommits.org/ and and creating release PRs.

Follow these steps to onboard repo to release-please:

- Create a github token under Personal tokens
- https://github.com/googleapis/release-please/blob/main/docs/cli.md#bootstrapping - Run the command to create release-please setup PR against target branch. Use token from first step
- https://github.com/google-github-actions/release-please-action - Add this github action to automate generation of release PRs. Make sure to allow github pull/push request to github actions under settings otherwise this action might fail to create a PR
