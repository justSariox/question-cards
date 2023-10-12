import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import '../src/styles/index.scss'
import type { Preview } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from '../src/services/store'
import { BrowserRouter } from 'react-router-dom'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export const decorators = [
  Story => (
    <BrowserRouter>
      <Provider store={store}>
        <Story />
      </Provider>
    </BrowserRouter>
  ),
]

export default preview
