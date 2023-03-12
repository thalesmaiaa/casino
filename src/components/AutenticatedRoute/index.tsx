import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, User } from '../../store/auth'

type Props = {
  children: ReactNode
}

const AuthenticatedRoute = ({ children }: Props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const isAuth = JSON.parse(
      localStorage.getItem('@casinoAuthStatus') as string,
    )

    const credentials = JSON.parse(
      localStorage.getItem('@casinoUser') as string,
    ) as User

    if (isAuth) {
      dispatch(login({ ...credentials }))
    }
  }, [dispatch])
  return <>{children}</>
}

export default AuthenticatedRoute
