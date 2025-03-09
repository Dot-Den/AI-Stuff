import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Outlet } from "react-router";

import './index.css'; // Ensure you import your global styles

function App() {
  return (
    <div className="min-h-screen flex flex-col">
        {/* Put current view in here based on URL: */}
        <Outlet />
    </div>
  );
}

export default App;