// MainLayout.tsx

import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";



interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
    <div className="w-full h-full flex dark:bg-[#101010] ">
        <div className="xl:w-[12%]">
            <Sidebar />
        </div>
        <div className="xl:w-[88%] py-10 ">
            {children}
        </div>
        {/* Additional components or styles specific to the main layout */}
    </div>
);

export default MainLayout;
