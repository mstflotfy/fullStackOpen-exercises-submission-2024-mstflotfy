const Notification = ({msg}) => {
  if (!msg) {
    return null
  } 

  return (
    <div className="error">{msg}</div>
  )
}

export default Notification