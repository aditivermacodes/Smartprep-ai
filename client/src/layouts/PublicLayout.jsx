import PublicNavbar from "../components/PublicNavbar";

function PublicLayout({ children }) {

  return (

    <div className="min-h-screen bg-black text-white">

      <PublicNavbar />

      {children}

    </div>
  );
}

export default PublicLayout;