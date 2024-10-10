import { useContext } from "react";
import "./index.css"
import { store } from "../../App";

const Widget = ({ category,handleCancelCustWidget,handleCancelWidgetAddition}) => {
const {changeTabId}=useContext(store)


  return (
    <div>
      <p className="widget-name">{category?.name}</p>
      <div className="widgets-card-container" onClick={()=> changeTabId(category.id)}>
        {category?.widgets?.map((item) => (
          <div  onClick={()=>handleCancelCustWidget(true) }
          
            key={item?.id}
            className="widget-card-container"
            
          >
            <p className="card-name">{item?.name}</p>
            <p className="card-text">{item?.text}</p>
          </div>
        ))}
        <div className="add-card">
          <button         
           onClick={()=>handleCancelWidgetAddition(true)}
          
     
            className="add-card-btn"
          >
            Add Widget +
          </button>
        </div>
      </div>
    </div>
  );
};


export default Widget;
