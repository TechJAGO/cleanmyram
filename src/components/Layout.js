import React from 'react'
import About from './About'

const Layout = () => {
  return (
    <>
    <section>
    <div className="card text-bg-dark">
  <img src="bg.jpg" className="card-img" alt="bg"/>
  <div className="card-img-overlay">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p className="card-text"><small>Last updated 3 mins ago</small></p>
  </div>
</div>
</section>
<About/>

    </>
  )
}

export default Layout
