import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">

        {children}

      </div>

    </div>
  );
}

export default DashboardLayout;