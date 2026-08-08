import React from 'react';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import "./header.scss";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import userIcon from "../../assets/images/user-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { toggleTheme } from '../../redux/slices/themeSlice';
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Card', path: '/card' }
];

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <>
      <AppBar
        component="nav"
        className="header"
      >
        <div className={`header-container ${theme === "dark" ? "dark" : "light"
          }`}>

          <div className="header-left">
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'flex', sm: 'none' } // Yalnız mobil-də görünür
              }}
            >
              <MenuIcon />
            </IconButton>

            <ShoppingBagRoundedIcon className='basket' />
            <Link to={'/'} className='logo-link'>
              <h1>Shopping</h1>
            </Link>
            <button onClick={() => dispatch(toggleTheme())}>Dark/Light</button>
          </div>

          <div className="header-center">
            <nav className="nav-links">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="nav-link"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="header-right">

            <Link to="/wish">
              <div className="box">
                <FavoriteBorderIcon className='parent' />
                <div className="zero">
                  <span>{wishlistCount}</span>
                </div>
              </div>
            </Link>
            <div className="box">
              <ShoppingBasketIcon className='parent' />
              <div className="zero">
                <span>{totalQuantity}</span>
              </div>
            </div>
            <div className="box">
              <img src={userIcon} alt="" />
            </div>
          </div>
        </div>
      </AppBar>

      {/* Mobile Drawer - Yalnız mobil üçün */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div
          className="drawer-content"
          style={{
            padding: '20px'
          }}
        >
          <h2 className="drawer-logo">LOGO</h2>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      {/* Spacer for fixed header */}
      <div style={{ height: '70px' }}></div>
    </>
  );
};

export default Header;
