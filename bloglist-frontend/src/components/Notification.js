import React from 'react'
import { Alert } from '@material-ui/lab'

const Notification = ({ message }) => {
  const type = message.type ? "success": "error"
  if(message.body === ''){
    return null
  }
  return(
    <div id='notif-div'>
      { (message &&
        <Alert severity={ type }>
          {message.body}
        </Alert>
      )}
    </div>
  )
}

export default Notification