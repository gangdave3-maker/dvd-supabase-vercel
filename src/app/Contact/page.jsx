'use client'
import React from 'react'
import Nav from '../Components/Nav'

function Contact() {
  return (
    <div>
        <Nav/>
        <div className='container bg-white/85 min-h-screen'>
            <h1 className='underline text-center py-4!'>About Us</h1>
            <p>
                {`\u2001`}{`\u2001`}{`\u2001`}My name is Pichaiyut Sirianantawong. I am a student learning Javascript, HTML, 
                CSS, REACT, Next.JS and REACT Native. I used to be .Net programmer before. However, I found out that Javascript
                and its library and framework are more interesting than dot Net. That&apos;s why I switch to learn the subjects.
                Finally, I need to create web application using Next.JS for my graduation project. If you want to test this web
                application, you can use the credentials below:<br/><br/>
                {`\u2001`}{`\u2001`}{`\u2001`}&#45; The user name are JohnDoe1, JohnDoe2, JohnDoe3, JohnDoe4 and JohnDoe5. Every 
                users have the same password. It is Congratulations@1.
                <br/><br/>
                {`\u2001`}{`\u2001`}{`\u2001`}After finishing my education, I would like to be a freelance to make website both static website
                and web application. Firstly, I would like to work on Upwork. In fact, I will try to be a freelance on the other
                platforms too. Thank you for checking out my graduation project. I hope you enjoy testing it.<br/><br/>
                {`\u2001`}{`\u2001`}{`\u2001`}Best Regards,<br/>
                {`\u2001`}{`\u2001`}{`\u2001`}Pichaiyut Sirianantawong
            </p>
        </div>
    </div>
    
  )
}

export default Contact
