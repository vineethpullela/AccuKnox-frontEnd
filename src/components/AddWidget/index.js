import { IoIosClose } from "react-icons/io";
import "./index.css"
import { useContext, useState } from "react";
import { store } from "../../App";

/*
const categories = {
  "categories": [
    {
      "id": 1,
      "name": "CSPM Executive Dashboard",
      "widgets": [
        { "id": "widget1", "name": "Cloud Accounts", "text": "Cloud related widget" },
        { "id": "widget2", "name": "Cloud Account Risk Assessment", "text": "CARA" }
      ]
    },
    {
      "id": 2,
      "name": "CWPP Dashboard",
      "widgets": [
        { "id": "widget1", "name": "Top 5 Namespace specific Alerts", "text": "alerts" },
        { "id": "widget2", "name": "Workload Alerts", "text": "workloads" }
      ]
    },
    {
      "id": 3,
      "name": "Registry Scan",
      "widgets": [
        { "id": "widget1", "name": "Image Risk Assessment", "text": "assessment" },
        { "id": "widget2", "name": "Image Security Issues", "text": "issues" }
      ]
    }
  ]
} */




const AddWidget = ({ showAddWidget, handleCancelWidgetAddition}) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [selectedId,setSelectedId]=useState("")
  const {data,addWidget}=useContext(store)

  const handleWidgetAddition=()=>{
   if(selectedId&&widgetName&&widgetText){
    const newWidget={
      id:`widget${Date.now()}`,
      name:widgetName,
      text:widgetText,
    }
 addWidget({categoryId:selectedId,widget:newWidget})
handleCancelWidgetAddition(false)
   }else{
    alert("please fill out all fields")
   }
  }

  return (
    showAddWidget ? (
      <div className="side-bar-container">
        <div className="hd-container">
          <p className="hd-name">Add Widget</p>
         <button onClick={()=>handleCancelWidgetAddition(false)} className="cl-btn"><IoIosClose size={45} className="icon" /></button> 
        </div>
      
        <div className="content-container">
                <select
                onChange={(e)=>setSelectedId(parseInt(e.target.value))}
                  className="add-select"
                >
                  <option disabled>Select Category</option>
                  
                   {data.categories.map((each)=>(
                    <option key={each.id} value={each.id}>
                    {each.name}
                </option>
                   ))} 
                
              </select>
                <input
                  placeholder="Enter widget name"
                  onChange={(e)=>setWidgetName(e.target.value)}
                  className="add-widget-input"
                />
                <input
                  placeholder="Enter widget text"
                  onChange={(e)=>setWidgetText(e.target.value)}
                className="add-widget-input"
                />
          </div>
      <div className="btn-container">
          <button
            className="btn"
            onClick={()=>handleCancelWidgetAddition(false)}
          >
            cancel
          </button>
          <button
            className="btn s-btn"
            onClick={handleWidgetAddition}
          >
            Save
          </button>
      </div>
    </div>):null
  )

};



export default AddWidget;