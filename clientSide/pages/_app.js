
import 'tailwindcss/tailwind.css'
import '../styles/helper.css'
import HeaderSection from '../components/sections/HeaderSection'
import AppContext from '../utils/context'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';


function MyApp({ Component, pageProps }) {
  const [UserAuthed, setUserAuthed] = useState({})

  useEffect(() => {
    try {
      const user = JSON.parse(Cookies.get("userProfile"))
      if (user) {
        setUserAuthed(user);
      }
    } catch (error) {
      //
    }
  }, [])

  return (
    <div className='px-4'>
      <AppContext.Provider
        value={{ UserAuthed, setUserAuthed }}
      >
        <HeaderSection />
        <Component {...pageProps} />
      </AppContext.Provider>
    </div>
  )
}

export default MyApp
