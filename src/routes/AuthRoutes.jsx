import {Route, Routes} from 'react-router-dom'
// import {Registration} from './components/Registration'
// import {ForgotPassword} from './components/ForgotPassword'
import Login from '../components/views/auth/login'
import AuthLayout from '../components/layout/AuthLayout'
const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}