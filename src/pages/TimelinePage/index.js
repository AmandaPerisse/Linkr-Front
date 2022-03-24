import React, { useContext } from 'react';
import UserContext from '../../Providers/UserContext';


function TimelinePage() {
  const { userInfos } = useContext(UserContext);
  console.log(userInfos)

  return <div>Timeline Page</div>;
}

export default TimelinePage;