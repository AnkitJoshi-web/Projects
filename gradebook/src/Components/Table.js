import React, {useState} from 'react'
import data from '../data.json'
import './CSS/table.css'
import Statistics from './Statistics';
import Pop from './Pop';

function Table() {

  const [data1, setdata1] = useState(data);
  const [order, setorder] = useState("ASC");
  const [search, setSearch] = useState("");
  const [NoButton, setNoButton] = useState("0 - 10");
  const [NameButton, setNameButton] = useState("A - Z");
  const [showModal, setShowModal] = useState(false);
  const [index,setIndex]=useState(0);
  const [statistics, setstatistics] = useState(false)
  const [sbtn, setsbtn] = useState("Open Statistics")

  
  const showTheModal = (e,i) => {
    console.log('hii');
    setIndex(i)
    setShowModal(true);
  }
  const closeTheModal = () => setShowModal(false);

  let addStyle = {
    backgroundColor: 'lightgray',
  }
  let removeStyle = {
    backgroundColor: '',
  }
  const [rowStyle, setRowStyle] = useState(removeStyle);

  const handleRow = (e, i) => {
    if(rowStyle === removeStyle) {
      e.stopPropagation();
      setRowStyle(addStyle)
    }
  }

  

  let status;
  let d =  data1.filter((student) => {
    if(search==='')
    return student
    else if(student.name.toLowerCase().includes(search.toLowerCase())){
      return student
    }
  }).map((student,i) => {
    let finalGrade = (0.6*(student.examGrade) + 0.4*(student.ratingGrade)).toFixed(2);
    if(finalGrade>4) {
      status = "Passed";
    } else {
      status = "Failed";
    }
    return(
      <tr key={student.id} 
      style={rowStyle}
      className='tdRow' 
      onClick={(e)=>handleRow(e, i)}>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.ticketNo}</td>
      <td>{student.ratingGrade}</td>
      <td>{student.examGrade}</td>
      <td>{finalGrade}</td>
      <td>{status}</td>
      <td><button onClick={(e)=>showTheModal(e,i)} className="detailBtn">Details</button></td>
  </tr>
 )
})

// Sort By Name
const sortByName = (col1) => {
  if(order==="ASC"){
    const sorted = data1.sort((a,b) => {
      return a[col1].toLowerCase()<b[col1].toLowerCase()?1:-1;
    })
    setdata1(sorted);
    setorder("DSC")
    setNameButton("A - Z")
  }
  if(order==="DSC"){
    const sorted = data1.sort((a,b) => {
      return a[col1].toLowerCase()>b[col1].toLowerCase()?1:-1;
    })
    setdata1(sorted);
    setorder("ASC")
    setNameButton("Z - A")
  }
}
// Sort By Final Grade
const sortByNo = (col1, col2) => {
  if(order==="ASC"){
    const sorted = data1.sort((a,b) => {
       a=Number(a[col1])*0.6 + Number(a[col2])*0.4;
       b=Number(b[col1])*0.6 + Number(b[col2])*0.4;
       return a>b?1:-1;
    })
    setdata1(sorted);
    setorder("DSC")
    setNoButton("10 - 0")
  }
  if(order==="DSC"){
    const sorted = data1.sort((a,b) => {
       a=Number(a[col1])*0.6 + Number(a[col2])*0.4;
       b=Number(b[col1])*0.6 + Number(b[col2])*0.4;
       return a<b?1:-1;
    })
    setdata1(sorted);
    setorder("ASC")
    setNoButton("0 - 10")
  }
}
// All Students
const All=()=>{
  setdata1(data)
}
// Passed Students
const Passed=()=> {
  console.log("jjj");
 const p= data.filter((student) => 
  {
    let finalGrade = (0.6*(student.examGrade) + 0.4*(student.ratingGrade)).toFixed(2);
    if(finalGrade>4) {
      return student;
    }
  })
  setdata1(p)
}
// Failed Students
const Fail=()=> {
 const f= data.filter((student) => 
  {
    let finalGrade = (0.6*(student.examGrade) + 0.4*(student.ratingGrade)).toFixed(2);
    if(finalGrade<=4) {
      return student;
    }
  })
  setdata1(f)
}
// Statistics Show and Hide
const getStatistics = () => {
  if(statistics) {
    setstatistics(false)
    setsbtn("Open Statistics")

  }
  else {
    setstatistics(true)
    setsbtn("Close Statistics")

  }
}

  return (
    <>
      <div>
        <div className="buttondiv">
        <button onClick={All}>All</button>
        <button onClick={Passed}>Pass</button>
        <button onClick={Fail}>Fail</button>
        <button onClick={()=>sortByNo("examGrade", "ratingGrade")}>{NoButton}</button>
        <button onClick={()=>sortByName("name")}>{NameButton}</button>
        <input onChange={(e)=>setSearch(e.target.value)} value={search} type="search" name="" id="search" placeholder='Search By Name'/>
      </div>
      </div>
      <table className='table'>
        <thead>
          <tr className='headRow'>
            <th>No</th>
            <th>Name</th>
            <th>Ticket's No</th>
            <th>Rating Grade</th>
            <th>Exam Grade</th>
            <th>Final Grade</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {d}
        </tbody>
      </table>
      {showModal && <Pop index={index} data1={data1} closeTheModal = {closeTheModal}/>}
      <div className='statisticsBtnDiv'>
        <button className='statisticsBtn' onClick={getStatistics}>{sbtn}</button>
      </div>
      {statistics && <Statistics/>}
    </>
  )
}

export default Table
