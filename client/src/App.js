import './App.css';
import { Route, Routes } from 'react-router-dom';

// user routes
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import Booking from './Pages/Booking';
import RequestedSlots from './Pages/RequestedSlots';
import SlotRequest from './Pages/SlotRequest';
import BookedSlot from './Pages/BookedSlot';
import NotFound from './Pages/NotFound';

function App() {


  return (
    <div>
      <Routes>
        <Route exact path='/'
          element={<HomePage />}
        />

        <Route exact path='/dashboard'
          element={<Dashboard />}
        />
        <Route exact path='/booking'
          element={<Booking />}
        />
        <Route exact path='/requestedslots'
          element={<RequestedSlots />}
        />
        <Route exact path='/slotRequest/:Area/:slotNo/:vehicleType/:id'
          element={<SlotRequest />}
        />
        <Route exact path='/BookedSlot/:slotNo/:area/:id/:email'
          element={<BookedSlot />}
        />
        <Route path="*" element={< NotFound />} />

      </Routes>
    </div>
  );
}

export default App;
