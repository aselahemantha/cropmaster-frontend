import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GrassIcon from '@mui/icons-material/Grass';

function SideNav() {
    const { collapsed } = useProSidebar();
    const theme = useTheme();

    return <Sidebar
        style={{ height: "100%", top: 'auto' }}
        breakPoint="md"
        backgroundColor={theme.palette.neutral.light}

    >
        <Box sx={styles.avatarContainer}>
            <Avatar sx={styles.avatar} alt="Masoud" src="src/assets/avatars/login.jpg" />
            {!collapsed ? <Typography variant="body2" sx={styles.yourChannel}>Owner</Typography> : null}
            {!collapsed ? <Typography variant="overline"> -- Owner Name -- </Typography> : null}
        </Box>

        <Menu
            menuItemStyles={{
                button: ({ level, active }) => {
                    return {
                        backgroundColor: active ? theme.palette.neutral.medium : undefined,
                    };
                },
            }}>
            <MenuItem active={window.location.pathname === "/ownerhome"} component={<Link to="/ownerhome" />} icon={<HomeOutlinedIcon />}> <Typography variant="body2">Home</Typography> </MenuItem>
            <MenuItem active={window.location.pathname === "/addfarmer"} component={<Link to="/addfarmer" />} icon={<AccountCircleIcon />}> <Typography variant="body2">Farmer Details </Typography></MenuItem>
            <MenuItem active={window.location.pathname === "/addfarmland"} component={<Link to="/addfarmland" />} icon={<GrassIcon />}> <Typography variant="body2"> Farm Land </Typography></MenuItem>

        </Menu >
    </Sidebar >; 
}

export default SideNav;

/**
 * @type {import("@mui/material").SxProps}
 */
const styles = {
    avatarContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: 'column',
        my: 5
    },
    avatar: {
        width: '40%',
        height: 'auto'
    },
    yourChannel: {
        mt: 1
    }

}