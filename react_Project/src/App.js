import './App.css';
import UsersList from './user/UsersList';
import AddUser from './user/AddUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetails from './user/UserDetails';
import UpdateUser from './user/UpdateUser';
import CoronaDetails from './corona/CoronaDetails';
import VaccinationsDetails from './vaccinations/VaccinationsDetails';
import UpdateCorona from './corona/UpdateCorona';
import UpdateVaccination from './vaccinations/UpdateVaccination';
import AddCorona from './corona/AddCorona';
import AddVaccinations from './vaccinations/AddVaccinations';
// import SummaryView from './SummaryView';
import SummaryView from './SummaryView ';
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path='addUser' element={<AddUser />} />
            <Route path='/' element={<UsersList />} />
            <Route path='userDetails/:idNumber' element={<UserDetails />} />
            <Route path='coronaDetails/:idNumber' element={<CoronaDetails />} />
            <Route path='vaccinationDetails/:idNumber' element={<VaccinationsDetails />} />
            <Route path="updateUser/:idNumber" element={<UpdateUser />} />
            <Route path="updateCorona/:idNumber/:index" element={<UpdateCorona />} />
            <Route path="updateVaccinations/:idNumber/:index" element={<UpdateVaccination />} />
            <Route path="addCorona/:idNumber" element={<AddCorona />} />
            <Route path="addVaccinations/:idNumber" element={<AddVaccinations />} />
            <Route path="SummaryView" element={<SummaryView />} />

          </Routes>

        </div>
      </Router>
    </>
  );
}

export default App;
