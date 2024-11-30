import { lazy,Suspense } from "react"


import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from "./components/layout/Header"
const Home = lazy(() => import('./pages/Home'))
const App = () => {
  return (
   <BrowserRouter>
   <Header/>
   <Suspense fallback={<div>Loading...</div>}>
   <Routes>
     <Route path="/" element={<Home />} />
   </Routes>
   </Suspense>
   </BrowserRouter>
  )
}

export default App
