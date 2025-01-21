import {Outlet} from "react-router-dom";

export function AppContent() {
    return(
        <main className="w-full h-screen overflow-y-auto">
            <Outlet/>
        </main>
    )
}
