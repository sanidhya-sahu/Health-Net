import React, { useEffect } from 'react'
import './chat.css'
import Loader from '../loader/loader'
import { marked } from 'marked';

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
    var input = document.getElementById("input-medicine").value;
    document.getElementById("responseBox").style.display = "flex";
    document.getElementById("respLoader").style.display = "flex";
    document.getElementById("responseContainer").style.display = "none";
    
    fetch(`https://med-check-health-net-api-7682.vercel.app/med?query=${input}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById("responseContainer").style.display = "flex";
        document.getElementById("respLoader").style.display = "none";
        
        if (data.status == "no_match") {
          document.getElementById("response").innerHTML = `
            <div class="medicine-info">
              <div class="info-row">
                <span>${data.message}</span>
              </div>
            </div>
          `;
        }
        // else if (data.status == "success") {
        //   document.getElementById("response").innerHTML = `
        //     <div class="medicine-info">
        //       <div class="info-row">
        //         <span class="info-label">Medicine Name</span>
        //         <span class="info-value">${data.data.medicine}</span>
        //       </div>
        //       <div class="info-row">
        //         <span class="info-label">Composition</span>
        //         <span class="info-value">${data.data.composition}</span>
        //       </div>
        //       <div class="info-row">
        //         <span class="info-label">AI Analysis</span>
        //         <span class="info-value">${data.data.analysis}</span>
        //       </div>
        //     </div>
        //   `;
        // }
        else if (data.status == "success") {
          const formattedAnalysis = marked.parse(data.data.analysis);
          document.getElementById("response").innerHTML = `
            <div class="medicine-info">
              <div class="info-row">
                <span class="info-label">Medicine Name</span>
                <span class="info-value">${data.data.medicine}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Composition</span>
                <span class="info-value">${data.data.composition}</span>
              </div>
              <div class="info-row">
                <span class="info-label">AI Analysis</span>
                <div class="info-value">${formattedAnalysis}</div>
              </div>
            </div>
          `;
        }
        
      })
      .catch(err => { console.log(err) });
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
        <input type="text" name="medicine" id="input-medicine" 
          onBlur={() => { unbindKey() }} 
          onFocus={() => { bindKey() }} 
          placeholder='Enter your medicine name.' />
        <button id='search' onClick={() => { getdata() }}>Search</button>
      </div>
      <div id='responseBox' className="responseBox">
        <div id="respLoader" className="loader" style={laoderStyle}><Loader></Loader></div>
        <div id="responseContainer" className="responseContainer" style={{display: 'none'}}>
          <div className="chatLogo">H</div>
          <div id='response' className="response"></div>
        </div>
      </div>
    </div>
  );
}

export default chat
