import React from 'react'
import '../App.css'
import ImageRightTextLeft from '../components/ImageRightTextLeft'
import ImageLeftTextRight from '../components/ImageLeftTextRight'

export default function Home() {
  return (
    <div className='home_mid'>
      <ImageRightTextLeft 
        imageSrc="https://fakeimg.pl/200x150/"
        textContent="DATABASE • opleiding info met CTA"  
      />
      <ImageLeftTextRight 
        imageSrc="https://fakeimg.pl/200x150/"
        textContent="DATABASE • portfolio selectie"
      />
      <ImageRightTextLeft 
        imageSrc="https://fakeimg.pl/200x150/"
        textContent="DATABASE • blog selectie"
      />
      <ImageLeftTextRight 
        imageSrc="https://fakeimg.pl/200x150/"
        textContent="DATABASE • diensten van opleidingen"
      />
    </div>
  )
}
