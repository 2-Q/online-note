
import '../styles/helper.css'
import 'tailwindcss/tailwind.css'
import HeaderSection from '../components/sections/HeaderSection'


function MyApp({ Component, pageProps }) {
  return <div className='px-4'>
    <HeaderSection />
    <Component {...pageProps} />
  </div>
}

export default MyApp
