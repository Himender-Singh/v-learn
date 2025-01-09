import React from 'react'
import Router from '../routes/Router'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Layout = () => {
  return (
    <>
      <Header/>
      <main>
        <Router/>
      </main>
      <Footer/>
    </>
  )
}

export default Layout