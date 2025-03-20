import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Container } from '../widgets/Container/Container'

const App: FC = () => {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default App
