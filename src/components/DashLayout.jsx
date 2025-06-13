import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  CssBaseline, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  InputBase,
  Button,
  styled,
  Avatar,
  Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/Layout.css';

// Adjusted drawer width
const drawerWidth = 160;

const AppBarStyled = styled(AppBar)({
  zIndex: 1201,
  backgroundColor: '#6a0dad', 
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: drawerWidth
});

const DrawerStyled = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#D1C4E9', 
    borderRight: 'none',
    paddingTop: 0,
  },
});

const Search = styled('div')({
  position: 'relative',
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  marginRight: 16,
  marginLeft: 0,
  width: '200px',
  '@media (min-width: 600px)': {
    marginLeft: 24,
  },
});

const SearchIconWrapper = styled('div')({
  padding: '0 16px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledInputBase = styled(InputBase)({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '8px 8px 8px 0',
    paddingLeft: 'calc(1em + 32px)',
    width: '100%',
  },
});

// Optimized button styles
const ActionButton = styled(Button)({
  marginLeft: '10px',
  padding: '6px 16px',
  minWidth: '80px',
  borderColor: 'white',
  color: 'white',
  '&:hover': { 
    borderColor: 'white', 
    backgroundColor: 'rgba(255,255,255,0.08)' 
  }
});

// Improved NavItem with fixed alignment
const NavItem = styled(ListItemButton)(({ selected }) => ({
  borderRadius: '0',
  padding: '12px 16px', 
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: selected ? '#9503b9' : 'transparent', 
  color: selected ? 'white' : 'inherit',
  borderLeft: selected ? '4px solid #6a0dad' : '4px solid transparent', 
  '&:hover': {
    backgroundColor: selected ? '#9503b9' : 'rgba(179, 157, 219, 0.3)',
  },
}));

// Navigation item container - ensures proper alignment of icon and text
const NavItemContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

// Icon container with fixed width and position
const IconContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  marginRight: '12px',
});

// Main content area - full width yellow container
const MainContent = styled(Box)({
  flexGrow: 1, 
  padding: 16,
  backgroundColor: '#f4f5b7', // Light yellow background
  minHeight: 'calc(100vh - 64px)', // Full height minus AppBar
  marginTop: 64, // Space for AppBar
  marginLeft: drawerWidth, // Account for drawer width
  width: `calc(100% - ${drawerWidth}px)`, // Take full width minus drawer
  boxSizing: 'border-box',
  overflow: 'auto', // Allow scrolling if content is too large
});

// Content container to fill the yellow area
const ContentContainer = styled(Box)({
  width: '100%',
  maxWidth: 'none',
  margin: '0',
  boxSizing: 'border-box',
});

// User info section in sidebar
const UserInfoSection = styled(Box)({
  padding: '16px',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  textAlign: 'center'
});

const StyledAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  margin: '0 auto 8px auto',
  backgroundColor: '#6a0dad'
});

const RoleChip = styled(Chip)({
  fontSize: '10px',
  height: '20px',
  backgroundColor: 'rgba(106, 13, 173, 0.2)',
  color: '#6a0dad'
});

const DashLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin, isEditor } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/dashboard/users':
        return 'Users Management';
      case '/dashboard/articles':
        return 'Articles Management';
      case '/dashboard/reports':
        return 'Reports';
      default:
        return 'Dashboard';
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.firstName ? user.firstName.charAt(0) : '';
    const lastInitial = user.lastName ? user.lastName.charAt(0) : '';
    return (firstInitial + lastInitial).toUpperCase() || user.email.charAt(0).toUpperCase();
  };

  // Navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      { text: 'Reports', icon: <AssessmentIcon />, path: '/dashboard/reports' }
    ];

    // Add Articles for Editors and Admins
    if (isEditor() || isAdmin()) {
      baseItems.splice(1, 0, { 
        text: 'Articles', 
        icon: <ArticleIcon />, 
        path: '/dashboard/articles' 
      });
    }

    // Add Users for Admins only
    if (isAdmin()) {
      baseItems.push({ 
        text: 'Users', 
        icon: <PeopleIcon />, 
        path: '/dashboard/users' 
      });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user && (
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                <Typography variant="body2" sx={{ color: 'white', marginRight: 1 }}>
                  Welcome, {user.firstName || user.email}
                </Typography>
                <RoleChip label={user.role} size="small" />
              </Box>
            )}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <ActionButton variant="outlined" onClick={handleHomeClick}>
              HOME
            </ActionButton>
            <ActionButton variant="outlined" onClick={handleLogout}>
              LOGOUT
            </ActionButton>
          </Box>
        </Toolbar>
      </AppBarStyled>
      
      {/* Fixed sidebar on the left with user info and role-based navigation */}
      <DrawerStyled
        variant="permanent"
        anchor="left"
      >
        {/* Add a spacer div to prevent content from being hidden under the AppBar */}
        <Box sx={{ height: 64 }} />
        
        {/* User Info Section */}
        {user && (
          <UserInfoSection>
            <StyledAvatar>
              {getUserInitials()}
            </StyledAvatar>
            <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: 0.5 }}>
              {user.firstName && user.lastName ? 
                `${user.firstName} ${user.lastName}` : 
                user.email}
            </Typography>
            <RoleChip label={user.role} size="small" />
          </UserInfoSection>
        )}
        
        {/* Role-based navigation list */}
        <List sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          p: 0,
          width: '100%',
        }}>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <NavItem
                component={Link}
                to={item.path}
                selected={location.pathname === item.path || 
                  (item.path !== '/dashboard' && location.pathname.includes(item.path))}
              >
                <NavItemContent>
                  <IconContainer>
                    {item.icon}
                  </IconContainer>
                  <Typography variant="body2">{item.text}</Typography>
                </NavItemContent>
              </NavItem>
            </ListItem>
          ))}
        </List>
      </DrawerStyled>
      
      <MainContent>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </MainContent>
    </Box>
  );
};

export default DashLayout;