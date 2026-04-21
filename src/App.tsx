import { useSelector } from 'react-redux';
import './App.scss'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import MyRouter from './routes/MyRouter'
import type { RootState } from "./app/store";
function App() {
const cartState = useSelector((state: RootState) => state.cart);
localStorage.setItem("cart",JSON.stringify(cartState))
  return (
   <>
   
   <Header></Header>
   <MyRouter></MyRouter>
   <Footer></Footer>
  
   </>
  )
}

export default App
