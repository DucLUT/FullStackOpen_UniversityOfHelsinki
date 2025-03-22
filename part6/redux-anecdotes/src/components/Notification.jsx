import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification) // Access notification from the store
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  if (!notification) {
    return null // Don't render anything if there's no notification
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification