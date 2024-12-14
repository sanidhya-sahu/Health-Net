import React from 'react'
import './chat.css'
import Loader from '../loader/loader'
function chat() {
  function getdata() {
    var input = document.getElementById("input-medicine").value
    document.getElementById("responseBox").style.display = "flex"
    document.getElementById("respLoader").style.display = "flex"
    document.getElementById("response").style.display = "none"
    fetch(`https://medcheck-model.onrender.com/med?query=${input}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("response").style.display = "flex"
      document.getElementById("respLoader").style.display = "none"
      if (data.status == "no_match") {
        document.getElementById("response").innerText = data.message
      }
      else if(data.status == "success"){
        document.getElementById("response").innerText = 
       `Medicine Name : ${data.medicine_name}
        Uses : ${data.uses}
        Composition : ${data.composition}
        Side Effects : ${data.side_effects}
        `
      }
    })
    .catch(err=>{console.log(err)})
  }
  const laoderStyle ={
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
            <input type="text" name="medicine" id="input-medicine" placeholder='Enter your medicine name.' />
            <button id='search' onClick={()=>{getdata()}} >Search</button>
        </div>
        <div id='responseBox' className="responseBox">
            <div className="chatLogo">H</div>
            <div id='respLoader' className="loader" style={laoderStyle} ><Loader></Loader></div>
            <div id='response' className="response"></div>
        </div>
    </div>
  )
}

export default chat
