import { useContext, useState } from "react";
import "./index.css"
import { BiSync } from "react-icons/bi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import AddWidget from "../AddWidget";
import WidgetCustomization from "../WidgetCustomization";
import Widget from "../Widget";
import { store } from "../../App";



const Dashboard = ({ searchQuery }) => {
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [showCustWidget,setCustWidget]=useState(false);
 
  const {data}=useContext(store)

  

  const handleCancelCustWidget=(value)=>{
    setCustWidget(value)
  }
 
  const handleCancelWidgetAddition = (value) => {
    setShowAddWidget(value);
  };


  const filteredCategories=data.categories.map((category)=>({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category)=>category.widgets.length>0);
   

  return (
    <div className="dashboard-container">
      <div className="header">
        <p className="title">CNAPP Dashboard</p>
        <div className="header-actions">
          <button
            className="btn"
            onClick={() => setShowAddWidget(true)}
           
          >
            Add Widget +
          </button>
          <button
            className="btn"
           onClick={()=>window.location.reload()}
          >
            <BiSync size={15} />
          </button>
          <button className="btn ">
            <PiDotsThreeVerticalBold
              size={15}
            />
          </button>
          <select className="date-filter" id="day" name="Last 2 days">
                <option>Last 2 days</option>
                <option>Last 2 days</option>
                <option>Last 2 days</option>
              </select>
        </div>
      </div>
      {filteredCategories.length > 0 ? (
        filteredCategories.map((item) => (
          <div key={item.id} className="widgets-card-container">
            <Widget
              category={item} handleCancelCustWidget={handleCancelCustWidget} handleCancelWidgetAddition={handleCancelWidgetAddition}
            />
          </div>
        ))
      ) : (
        <p className="no-widget">No widgets found</p>
      )}
      

        
     <AddWidget showAddWidget={showAddWidget} handleCancelWidgetAddition={handleCancelWidgetAddition} />
     <WidgetCustomization showCustWidget={showCustWidget} handleCancelCustWidget={handleCancelCustWidget}/>
    </div>
  );
};


export default Dashboard;






/*
     {data.categories.map((item)=>(<div key={item.id} className="widgets-card-container">
        <Widget category={item} handleCancelCustWidget={handleCancelCustWidget} handleCancelWidgetAddition={handleCancelWidgetAddition} />

      </div>

        ))}



 {filteredCategories.length > 0 ? (
        filteredCategories.map((item) => (
          <div key={item.id} className="widgets-card-container">
            <Widget
              category={item} handleCancelCustWidget={handleCancelCustWidget} handleCancelWidgetAddition={handleCancelWidgetAddition}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No widgets found</p>
      )}

*/