![NPM](https://img.shields.io/npm/l/react-optimistic-ui-hook) [![Build Status](https://travis-ci.com/mamal72/react-optimistic-ui-hook.svg?branch=master)](https://travis-ci.com/mamal72/react-optimistic-ui-hook) [![codecov](https://codecov.io/gh/mamal72/react-optimistic-ui-hook/branch/master/graph/badge.svg)](https://codecov.io/gh/mamal72/react-optimistic-ui-hook) ![David](https://img.shields.io/david/mamal72/react-optimistic-ui-hook) ![npm](https://img.shields.io/npm/v/react-optimistic-ui-hook) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-optimistic-ui-hook)

# react-optimistic-ui-hook

Minimal "optimistic UI" pattern implementation in a React hook.


## What is "Optimistic UI"?

> Optimistic UIs don’t wait for an operation to finish to update to the final state. They immediately switch to the final state, showing fake data for the time while the real operation is still in-progress. [Read More Here](https://uxplanet.org/optimistic-1000-34d9eefe4c05)

Note that you can search for "optimistic UI" and read more about this pattern and how it works. It simply lets your app looks faster by expecting a successful call to something like an API before getting the real response and update the interface based on that expectation.


## Installation

Using NPM:

```bash
npm install react-optimistic-ui-hook
```

Using Yarn:

```bash
yarn add react-optimistic-ui-hook
```


## Usage

```tsx
import React from 'react'
import { useOptimisticUI } from 'react-optimistic-ui-hook'

const USERNAME = 'mamal72'
const PREDICTED_AVATAR_URL = 'https://avatars0.githubusercontent.com/u/810438?v=4'

async function getGithubAvatarURL(username: string): string {
  const response = await fetch(`https://api.github.com/users/${username}`)
  const data = await response.json()
  
  return data.avatar_url
}

export function GithubAvatar() {
  const { status, result, error } = useOptimisticUI<string>(() => fetchGithubAvatarURL(USERNAME), PREDICTED_AVATAR_URL)

  if (status === 'failed') {
    // The "result" will be the predicted image passed to the hook
    // But "error" is set to the raised error in the passed promise
    console.error("Error fetching avatar URL!", error)
  }

  if (status === 'loading') {
    // The result will be the predicted image passed to the hook again!
    console.log('Loading image!')
  }

  if (status === 'succeed') {
    // The result will be the resolved promise response here!
    console.log("Resolved image!", result)
  }

  return (
    <div>
      <img src={result} />
      <p>Status: {status}</p>
    </div>
  )
}
```


## Contribution

You can report bugs and issues [here](https://github.com/mamal72/react-optimistic-ui-hook/issues/new).

You can also send a PR if you feel like you can improve or fix something. Don't forget to write/update tests for your changes.
