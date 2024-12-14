import React from 'react';

import { useCookies } from 'react-cookie';

import { Redirect } from 'react-router-dom';

function ProtectedHandler() {

  const [cookie, setCookie] = useCookies(['user'])
  const renderRedirect = () => {
    if (cookie.user === undefined) {
      return <Redirect to='/admin/login' />
    }
  }
  return (
    <div>
      {renderRedirect()}
    </div>
  )
}

export default ProtectedHandler
