import React, { useContext } from 'react';
import { AuthContext } from './../../components/AuthContext';
// import { userService } from './../../services/userService';

export const HomePage = () => {
  // const [error, setError] = useState('');
  // const [user, setUser] = useState([]);
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   userService.getOne()
  //     .then(setUser);
  //   // .catch(error => {
  //   //   setError(error.message);
  //   // });
  // }, []);
  console.log(user);

  return (
    <div className="content">
      {user && (
        <h1 className="title">Hello, {user.displayName}</h1>
      )}
      {!user && (
        <h1 className="title">Have problem</h1>
      )}
      {/* <button>Log</button> */}
     


      {/* {error && <p className="notification is-danger is-light">{error}</p>} */}
    </div>
  );
};