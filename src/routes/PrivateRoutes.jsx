import {Route, Routes, Navigate} from 'react-router-dom'
import PrivateLayout from '../components/layout/PrivateLayout'
import {SetTitle} from '../components/layout/TitleBar/SetTitle'
import Welcome from '../components/views/welcome'
const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/welcome' />} />
        {/* Pages */}
        <Route path='welcome' element={<><SetTitle title='Welcome'/><Welcome /></>} />
        <Route path='download' element={<><SetTitle title='Download'/><Welcome /></>} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='error' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
