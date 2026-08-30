import { useState } from "react";

import Sidebar from "../components/admin/layout/Sidebar";
import Topbar from "../components/admin/layout/Topbar";

function AdminLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Sidebar */}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Main Area */}

            <div className="lg:ml-72">

                <Topbar
                    setSidebarOpen={setSidebarOpen}
                />

                <main
                    className="
                        min-h-[calc(100vh-64px)]
                        overflow-x-hidden
                        p-4
                        sm:p-6
                        lg:p-8
                    "
                >

                    {children}

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;