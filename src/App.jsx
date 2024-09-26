import './App.css'
import conf from './conf/conf'

function App() {
  console.log(import.meta.env.VITE_TEST)

  return (
    <>
    <h1>MEGA-BLOG</h1>
    <p>{conf.appwriteUrl}</p>
    <p>{conf.appwriteProductId}</p>
    <p>{conf.appwriteDatabaseId}</p>
    <p>{conf.appwriteCollectionId}</p>
    <p>{conf.appwriteBucketId}</p>
    </>
  )
}

export default App
