import "./App.css";

import Navbar from "./components/Navbar"
import {  Routes, Route } from "react-router-dom";

import { createContext, useEffect, useState } from "react";
import Home from "./components/Home"
import Dashboard from "./components/Dashboard";

export const store=createContext();
const categories = {
  "categories": [
    {
      "id": 1,
      "name": "CSPM Executive Dashboard",
      "widgets": [
        { "id": "widget1", "name": "Cloud Accounts", "text": "Cloud related widget" },
        { "id": "widget2", "name": "Cloud Account Risk Assessment", "text": "CARA"}
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
        { "id": "widget1", "name": "Image Risk Assessment", "text": "assessment"},
        { "id": "widget2", "name": "Image Security Issues", "text": "issues" }
      ]
    }
  ]
}


function App() {
  const [searchQuery,setSearchQuery]=useState("")
  const [activeTabId,setActiveTabId]=useState(2)
    const [data,setData]=useState(categories)
  const [tabData,setTabData]=useState(categories.categories.filter((each)=>each.id===1)[0].widgets)



  useEffect(()=>{
    setTabData(data.categories.filter((each)=>each.id===activeTabId)[0])
  },[activeTabId])





const handelToggle=(id)=>{
  const filterdata = data.categories.map((category) => {

    if (category.id === activeTabId) {
      return {
        ...category,
        widgets: category.widgets.map((widget) => {
      
          if (widget.id === id) {
            return { ...widget, checked: "false" }; 
          }
          return widget;
        })
      };
    }
    return category; // Return category unchanged if id != 2
  });

  setData(filterdata)
  
}

const addWidget=({categoryId,widget})=>{
  setData(prevState=>{
    return {...prevState,categories:prevState.categories.map(category=>
        category.id===categoryId?{...category,widgets:[...category.widgets,widget]}
        :category
    ),
  };
  });
}


const removeWidget=({categoryId,widgetId})=>{
  setData(prevState=>{
    return {...prevState,categories:prevState.categories.map(category=>
        category.id===categoryId?{...category,widgets:category.widgets.filter((widget)=>widget.id !==widgetId)}:category
    
    ),
  };
  });
}


 
  

  const handleSearch=(query)=>{
    setSearchQuery(query)
  }


 

  const changeTabId=(id)=>{
    setActiveTabId(id)
  }




 
 
  return (
    
    <><store.Provider value={{data,tabData,setTabData,activeTabId,changeTabId,handelToggle,addWidget,removeWidget}}>

    
        <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<Dashboard searchQuery={searchQuery} />}
          />
        </Routes>
        </store.Provider>
        </>
  
  );
}

export default App;
