import "./services.scss";
import serviceData from '../assets/data/serviceData';
import 'remixicon/fonts/remixicon.css';
import { useSelector } from 'react-redux';
import { RootState } from "../app/store";

const Services = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <section className={`servicesSection ${theme === "dark" ? "dark" : "light"}`}>
      <div className="servicesContainer">
        {serviceData.map((item, index) => (
          <div 
            key={index} 
            className="serviceCard" 
            style={{ '--card-bg': item.bg } as React.CSSProperties}
          >
            <div className="iconBox">
              <i className={item.icon}></i>
            </div>
            <div className="contentBox">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
