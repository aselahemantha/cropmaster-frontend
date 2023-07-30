import { createBrowserRouter, Route, Routes } from 'react-router-dom';
import ReportDisease from '../containers/ReportDisease.jsx';
import UseMachine from '../containers/UseMachine.jsx';
import Home from '../containers/Home.jsx';
import Irrigation from '../containers/Irrigation.jsx';
import UseChemical from '../containers/UseChemical.jsx';
import Harvest from "../containers/Harvest.jsx";
import Storage from "../containers/Storage.jsx";


const AppRoutes = () => {
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/reportdisease' element={<ReportDisease />} />
        <Route path='/usechemical' element={<UseChemical />} />
        <Route path='/usemachine' element={<UseMachine />} />
        <Route path='/irrigation' element={<Irrigation />} />
        <Route path='/harvest' element={<Harvest />} />
        <Route path='/storage' element={<Storage />} />
    </Routes>
};

export default AppRoutes;