import {useContext, useEffect} from 'react';
import {Context} from '../context/AuthContext';
const Checker = () => {
  const {tryLocalSignIn} = useContext(Context);

  /* 
                                                ===============
                                                | CHECK TOKEN |  
                                                ===============
*/

  useEffect(() => {
    tryLocalSignIn();
  }, []);
  return null;
};

export default Checker;
