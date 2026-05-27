import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        
        <Topbar />

        {children}

      </div>

    </div>
  );
}

export default DashboardLayout;