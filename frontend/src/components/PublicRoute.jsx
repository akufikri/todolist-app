import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
      const userToken = localStorage.getItem('userToken');
      const userEmail = localStorage.getItem('userEmail');

      if (userToken && userEmail) {
            return <Navigate to="/" />;
      }

      return children;
}

export default PublicRoute;
