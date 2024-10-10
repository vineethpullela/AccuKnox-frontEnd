import { IoIosClose } from "react-icons/io";
import "./index.css"
import { useContext, useEffect, useState } from "react";
import { store } from "../../App";








const WidgetCustomization = ({showCustWidget,handleCancelCustWidget,}) => {
  const {data,tabData,changeTabId,activeTabId,removeWidget}=useContext(store)
  const [checkedWidgets,setCheckedWidgets]=useState({});
 
  ///console.log()
 
  useEffect(() => {
    if (data.categories.length > 0) {
      const updatedCheckedWidgets = data.categories.reduce((acc, category) => {
        acc[category.id] = category.widgets.reduce((wAcc, widget) => {
          wAcc[widget.id] = true; // Initialize all widgets as checked
          return wAcc;
        }, {});
        return acc;
      }, {});
      console.log(updatedCheckedWidgets)
      setCheckedWidgets(updatedCheckedWidgets);
    }
  }, [data]);

  

  const handelToggle=(categoryId,widgetId)=>{
    setCheckedWidgets((prevState)=>({
      ...prevState,[categoryId]:{
        ...prevState[categoryId],[widgetId]:!prevState[categoryId][widgetId],
      },
    }));
  }


  const handelSave=()=>{
    data.categories.forEach(category => {
      category.widgets.forEach((widget)=>{
        if(!checkedWidgets[category.id][widget.id]){
          removeWidget({categoryId:category.id,widgetId:widget.id})
          handleCancelCustWidget(false)
        }
      })
    });
  }

 

  return (showCustWidget?
   
      (<div className="wdg-bar-container">
        <div className="wdg-container">
          <p className="wdg-name">Add Widget</p>
         <button  onClick={()=>handleCancelCustWidget(false)} className="cl-btn"><IoIosClose size={45} className="icon" /></button> 
        </div>
        <p className="wdg-p">Personalze you dashboard by adding the following widget</p>
      
      <ul className="tabs-container">
       {data.categories.map((each)=>(<li className={activeTabId===each.id?"active":""} key={each.id} onClick={()=> changeTabId(each.id)}>{each.name}</li>))} 
       
      
      </ul> 
    <div className="tab-items-container">
   

      {tabData.widgets.map((widget)=>{
       
       return( <span key={widget.id}  
        className="tab-item">
          <input type="checkbox"  onChange={()=>handelToggle(tabData.id,widget.id)}  checked={checkedWidgets[tabData.id][widget.id]} />
          <span>{widget.name}</span>
        </span>)
      })}
    </div>

       
      <div className="btn-container">
          <button
            className="btn"
            onClick={()=>handleCancelCustWidget(false)}
          >
            cancel
          </button>
          <button
            className="btn s-btn"
            onClick={handelSave}
            
          >
            Save
          </button>
      </div>
    </div>):null
  )

};



export default WidgetCustomization;