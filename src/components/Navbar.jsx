import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../Context/AuthContext'
import { makeStyles } from '@mui/styles';
import Glasses from './assets/signup_glasses.jpg';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';

const useStyles = makeStyles({
    appb: {
        background: 'white'
    }
})

export default function Navbar({ userData }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { logout } = React.useContext(AuthContext);
    const classes = useStyles();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleprofile = () => {
        window.location.href = `/profile/${userData.userID}`
    }

    const handlelogout = async () => {
        await logout();
        window.location.href = '/login'
    }

    const handleBannerClick = () => {
        window.location.href = '/'
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleprofile}><AccountCircleIcon /><span>&nbsp;&nbsp;</span>Profile</MenuItem>
            <MenuItem onClick={handlelogout}><LogoutIcon /><span>&nbsp;&nbsp;</span>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleprofile}><AccountCircleIcon /><span>&nbsp;&nbsp;</span>Profile</MenuItem>
            <MenuItem onClick={handlelogout}><LogoutIcon /><span>&nbsp;&nbsp;</span>Logout</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ background: 'white' }}>
                <Toolbar>
                    <div style={{marginLeft: '4rem'}}>
                        <img src={Glasses} style={{width:'100%', height:'3rem'}} alt="Icon" onClick={handleBannerClick} />
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, color: 'black', alignItems: 'center', marginRight: '4rem' }}>
                        <HomeIcon onClick={handleBannerClick} sx={{ marginRight: '1.5rem', cursor: 'pointer', height:'2rem', width:'2rem' }} />
                        <ExploreIcon onClick={handleBannerClick} sx={{ marginRight: '1.5rem', cursor: 'pointer', height:'2rem', width:'2rem' }} />
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <div style={{ display: "flex", marginBottom: "3px", cursor:'pointer' }}>
                                <img
                                    src={userData.profileImage}
                                    style={{ height: "2rem", width: "2rem", borderRadius: "50%", marginRight: "5px" }}
                                    alt="Profile"
                                />
                            </div>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
