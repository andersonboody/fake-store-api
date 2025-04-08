import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import '@ant-design/v5-patch-for-react-19'

import { store } from '@services/store/store'
import { MainRouter } from '@/app/router/mainRouter'
import '@/app/style/main.scss'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={MainRouter} />
  </Provider>
)
