import React from 'react'
import {Routes,Route} from 'react-router-dom';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
        <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/search' element={<Search></Search>} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/create-listing' element={<CreateListing></CreateListing>}></Route>
          <Route path='/update-listing/:id' element={<UpdateListing></UpdateListing>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App