import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
      const userToken = localStorage.getItem('userToken');
      const userEmail = localStorage.getItem('userEmail');

      if (!userToken || !userEmail) {
            return <Navigate to="/masuk" />;
      }

      return children;
}

export default ProtectedRoute;
