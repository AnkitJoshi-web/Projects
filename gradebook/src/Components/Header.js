import React from 'react'
import './CSS/header.css'

function Header() {

  return (
    <>
      <div className='title'>
        <h2>GradeBook</h2>
      </div>

      <div className='header-information'>
        <div className='grid-container'>
          <span>Institute : Lovely Professional University</span>
          <span>Department : School of Computer Science</span>
          <span>Section : K19EF</span>
          <span>Course Title : Front-End Development</span>
          <span>Project Title : Student Grading System</span>
          <div className='professor-name-div'>
            <span>Professor : Sandeep Kaur</span>
          </div>
        </div>  
      </div>
    </>
  )
}

export default Header
