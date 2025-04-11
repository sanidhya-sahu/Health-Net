import React, { useEffect } from 'react'
import './chat.css'
import Loader from '../loader/loader'
function chat() {
  function bindKey() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        getdata()
      }
    });
  }
  function unbindKey() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        return
      }
    });
  }
  function getdata() {
    var input = document.getElementById("input-medicine").value
    document.getElementById("responseBox").style.display = "flex"
    document.getElementById("respLoader").style.display = "flex"
    document.getElementById("response").style.display = "none"
    fetch(`https://med-check-health-net-api-7682.vercel.app/med?query=${input}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById("response").style.display = "flex"
        document.getElementById("respLoader").style.display = "none"
        if (data.status == "no_match") {
          document.getElementById("response").innerText = data.message
        }
        else if (data.status == "success") {
          document.getElementById("response").innerHTML =
            `<span><span style="color:#00ac94">Medicine Name</span> : ${data.medicine_name}</span>
        <span><span style="color:#00ac94">Uses</span> : ${data.uses}</span>
        <span><span style="color:#00ac94">Composition</span> : ${data.composition}</span>
        <span><span style="color:#00ac94">Side Effects</span> : ${data.side_effects}</span>
        `
        }
      })
      .catch(err => { console.log(err) })
  }
  const laoderStyle = {
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
  return (
    <div className='chatWrap'>
      <div className="chatHead">Get to know about your medicines.</div>
      <div className="searchbar">
        <input type="text" name="medicine" id="input-medicine" onfocusout={() => { unbindKey() }} onFocus={() => { bindKey() }} placeholder='Enter your medicine name.' />
        <button id='search' onClick={() => { getdata() }} >Search</button>
      </div>
      <div id='responseBox' className="responseBox">
        <div className="chatLogo">H</div>
        <div id='response' className="response"></div>
        <div id='respLoader' className="loader" style={laoderStyle} ><Loader></Loader></div>
      </div>
    </div>
  )
}

export default chat
