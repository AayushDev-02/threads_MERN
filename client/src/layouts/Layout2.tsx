// MainLayout.tsx

import { Sidebar } from "lucide-react";
import { ReactNode } from "react";



interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
    <div className="w-full h-screen">
        <div className="w-1/4">
            <Sidebar />
        </div>
        <div className="w-3/4">
            {children}
        </div>
        {/* Additional components or styles specific to the main layout */}
    </div>
);

export default MainLayout;
