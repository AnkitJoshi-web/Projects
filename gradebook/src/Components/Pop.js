import React from 'react'
import './CSS/modaldata.css'


function Pop(props) {
  return (
    <div>
         <div className="modal">
          <div className="modaldata">
            <br />
            <p> Name : {props.data1[props.index].details.name}</p> <br />
            <p> Address :  {props.data1[props.index].details.Address}</p> <br />
            <p> Contact :  {props.data1[props.index].details.contact}</p> <br />
            <p> Email :  {props.data1[props.index].details.Email}</p> <br />
            <p> Comments : {props.data1[props.index].details.comments}</p> <br/>
            <button className="closePopupBtn" onClick={props.closeTheModal}>Close</button>
          </div>
        </div>
    </div>
  )
}

export default Pop
