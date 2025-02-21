const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const className = type === 'error' ? 'error' : 'normal'

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification