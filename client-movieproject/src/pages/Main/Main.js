import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?'); 
    if (confirmLogout) {
      setIsLoggingOut(true); 
      setTimeout(() => {
        localStorage.removeItem('accessToken');
        setIsLoggingOut(false); 
        navigate('/login'); 
      }, 3000); 
    }
  };

  useEffect(() => {
    if (!accessToken) { 
      navigate('/login'); 
    }
  }, [accessToken, navigate]); 

  return (
    <div className="Main">
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              {/* Disable navigation for Movies */}
              <a
                style={{ pointerEvents: 'none', color: 'gray', cursor: 'not-allowed' }}
                onClick={(e) => e.preventDefault()}
              >
                Movies
              </a>
            </li>
            <li>
              <a onClick={() => navigate('/home')}>Home</a>
            </li>
            {accessToken ? (
              <li className="logout">
                <a onClick={handleLogout}>Log Out</a>
              </li>
            ) : (
              <li className="login">
                <a onClick={() => navigate('/login')}>Login</a> {/* Updated to navigate to login */}
              </li>
            )}
          </ul>
        </div>
        <div className="outlet">
          {isLoggingOut ? (
            <div className="loading-spinner"></div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
