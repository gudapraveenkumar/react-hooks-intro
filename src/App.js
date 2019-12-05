import React, {useState, useEffect} from 'react';

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
}

const App = () => {

  const [count, setCount] = useState(0)
  const [isOn, setIsOn] = useState(false)
  const [mousePosition, setMousePosition] = useState({x: null, y: null})
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine)
  const [{latitude, longitude, speed}, setLocation] = useState(initialLocationState)
  let mounted = true;

  // Function will execute on every state update and on each render
  useEffect(() => {
    document.title = `You have clicked ${count} times`
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    navigator.geolocation.getCurrentPosition(handleGeoLocation)
    const watchId = navigator.geolocation.watchPosition(handleGeoLocation)

    // Component unmount, As the useEffect runs on every state change even this function
    // will execute every time
    return () =>{
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      navigator.geolocation.clearWatch(watchId);
      mounted = false
    }
    // If we want to run this only if a particular state change then we can pass
    // it in the array as below. Now only when count is changed the useEffect will execute
  }, [count])

  const handleGeoLocation = event =>{
    if(mounted){
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      })
    }
  }

  const handleOnline = () =>{
    setOnlineStatus(true)
  }

  const handleOffline = () =>{
    setOnlineStatus(false)
  }

  const handleMouseMove = event =>{
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    })
  }

  const incrementCount = () =>{
    setCount(prevCount => prevCount + 1)
  }

  const toggleLight = () =>{
    setIsOn(prevIsOn => !prevIsOn)
  }

  return (
   <>
    <h2>Counter</h2>
    <button onClick={incrementCount}>
      I was clicked {count} times
    </button>
    <h2>Tooggle Light</h2>
    <img
    src={
      isOn ? 'https://icon.now.sh/highlight/fd0' : 'https://icon.now.sh/highlight/aaa'
    }
    style={{
      height: '50px',
      width: '50px',
    }}
    onClick={toggleLight} />

    <h2>Mouse Position</h2>
    {JSON.stringify(mousePosition, null, 2)}

    <h2>Network Status</h2>
    <p>You are <strong>{onlineStatus ? "online" : "offline"}</strong></p>

    <h2>Geolocation</h2>
    <p>Latitude is {latitude}</p>
    <p>Longitude is {longitude}</p>
    <p>Your speed is {speed ? speed : "0"}</p>
   </>
  );
}

export default App;
