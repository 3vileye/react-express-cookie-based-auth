import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import Error from '../components/views/error/Error';
import {AuthPage} from './AuthRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import App from '../App'
import { useSelector } from 'react-redux';
import { checkisLogedIn } from '../state/auth.slice';

const AppRoutes= () => {
  const islogedIIn = useSelector(checkisLogedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<Error />} />
          {islogedIIn ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/welcome' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='auth/login' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
