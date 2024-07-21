import Layout from '@/layouts/layouts';
import Dashboard from '@/view/Dashboard';
import Login from '@/view/Login';
import Notfound from '@/view/Notfound';
import Register from '@/view/Register';
import Trash from '@/view/Trash';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import PublicRoute from '@/components/PublicRoute';
import { Create } from '@/components/todo/Create';
import { Edit } from '@/components/todo/Detail';

export default function Router() {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={
                              <ProtectedRoute>
                                    <Layout />
                              </ProtectedRoute>
                        }>
                              <Route index element={<Dashboard />} />
                              <Route path='trash' element={<Trash />} />
                              <Route path='/create' element={<Create />} />
                              <Route path='/:id' element={<Edit />} />
                        </Route>
                        <Route path='/daftar' element={
                              <PublicRoute>
                                    <Register />
                              </PublicRoute>
                        } />
                        <Route path='/masuk' element={
                              <PublicRoute>
                                    <Login />
                              </PublicRoute>
                        } />
                        <Route path="/*" element={<Notfound />} />
                  </Routes>
            </BrowserRouter>
      );
}
