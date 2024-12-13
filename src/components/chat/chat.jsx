import React from 'react'
import './chat.css'
function chat() {
  function getdata() {
    var input = document.getElementById("input-medicine").value
    fetch(`https://1e94-2405-201-1000-8077-ed61-e81b-7f46-38e.ngrok-free.app/med?query=${input}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err=>{console.log(err)})
  }
  return (
    <div className='chatWrap'>
        <div className="chatHead">Get to know about your medicines.</div>
        <div className="searchbar">
            <input type="text" name="medicine" id="input-medicine" placeholder='Enter your medicine name.' />
            <button id='search' onClick={()=>{getdata()}} >Search</button>
        </div>
        <div className="responseBox">
            <div className="chatLogo">H</div>
            <div className="response">Hello, the closest match to your medicine is Crocin Advance 500mg Tablet , it is used for Pain relief, Treatment of Fever , and has the following side effects : Stomach pain Nausea Vomiting , here are the composition(s) of your medicine Paracetamol (500mg)</div>
        </div>
    </div>
  )
}

export default chat
