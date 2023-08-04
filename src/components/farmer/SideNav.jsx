import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'; import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'; import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'; import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined'; import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import ScienceIcon from '@mui/icons-material/Science';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import WarehouseIcon from '@mui/icons-material/Warehouse';

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
            {!collapsed ? <Typography variant="body2" sx={styles.yourChannel}>Farmer</Typography> : null}
            {!collapsed ? <Typography variant="overline"> -- Farmer Name -- </Typography> : null}
        </Box>

        <Menu
            menuItemStyles={{
                button: ({ level, active }) => {
                    return {
                        backgroundColor: active ? theme.palette.neutral.medium : undefined,
                    };
                },
            }}>
            <MenuItem active={window.location.pathname === "/farmerhome"} component={<Link to="/farmerhome" />} icon={<HomeOutlinedIcon />}> <Typography variant="body2">Home</Typography> </MenuItem>
            <MenuItem active={window.location.pathname === "/reportdisease"} component={<Link to="/reportdisease" />} icon={<CoronavirusIcon />}> <Typography variant="body2">Report Diseases </Typography></MenuItem>
            <MenuItem active={window.location.pathname === "/usechemical"} component={<Link to="/usechemical" />} icon={<ScienceIcon />}> <Typography variant="body2"> Use Chemicals </Typography></MenuItem>
            <MenuItem active={window.location.pathname === "/usemachine"} component={<Link to="/usemachine" />} icon={<PrecisionManufacturingIcon />}> <Typography variant="body2">Use Machines </Typography></MenuItem >
            <MenuItem active={window.location.pathname === "/irrigation"} component={<Link to="/irrigation" />} icon={<WaterDropIcon />}> <Typography variant="body2">Irrigation </Typography></MenuItem >
            <MenuItem active={window.location.pathname === "/harvest"} component={<Link to="/harvest" />} icon={<AgricultureIcon />}> <Typography variant="body2">Harvest </Typography></MenuItem >
            <MenuItem active={window.location.pathname === "/storage"} component={<Link to="/storage" />} icon={<WarehouseIcon />}> <Typography variant="body2">Storage </Typography></MenuItem >

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