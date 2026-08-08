import "./services.scss";
import serviceData from '../assets/data/serviceData';
import 'remixicon/fonts/remixicon.css';
import { useSelector } from 'react-redux';
import { RootState } from "../app/store";
const Services = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  return (
    <div className={`servicesSection ${theme === "dark" ? "dark" : "light"}`} >
      {
        serviceData.map((item)=>(
          <div className='box' style={{background:`${item.bg}`}}>
            <i className={item.icon}></i>
            <h5>{item.subtitle}</h5>            
          </div>
        ))
      }
    </div>
  )
}

export default Services