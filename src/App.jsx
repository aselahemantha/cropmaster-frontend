import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { Sidebar, Menu, MenuItem, SubMenu, ProSidebarProvider } from 'react-pro-sidebar';

import { Box, Button, Container, ThemeProvider, Typography } from '@mui/material';
import theme from './config/theme';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';

// Farmer UI
//import SideNav from './components/farmer/SideNav.jsx';
//import AppHeader from './components/farmer/AppHeader.jsx';

// Owner UI
import SideNavOwner from './components/owner/SideNav.jsx';
import AppHeaderOwner from './components/owner/AppHeader.jsx';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />                 {/*to add css basic rules */}

          <AppHeaderOwner />
          <Box sx={styles.container}>
            <BrowserRouter>
              <SideNavOwner />
              <Box
                component={'main'}
                sx={styles.mainSection}
              >
                <AppRoutes />
              </Box>

            </BrowserRouter>

          </Box>
        </ProSidebarProvider>
      </ThemeProvider>

    </React.Fragment>
  )
}

/**
 * @type {import('@mui/material').SxProps}
 */
const styles = {
  container: {
    display: 'flex',
    bgcolor: 'neutral.light',
    height: 'calc(100% - 64px)'
  },
  mainSection: {
    p: 4,
    width: '100%',
    height: '100%',
    overflow: 'auto',
  }
}
export default App
