import { createContext, useContext } from "react";
import { useReportesPage } from "../hooks/useReportesPage";
import { ReactNode } from "react";

type ReportesContextType = ReturnType<typeof useReportesPage>;

const ReportesContext = createContext<ReportesContextType | undefined>(undefined);

export function ReportesProvider({ children }: { children: ReactNode }) {
    const value = useReportesPage();
    return (
        <ReportesContext.Provider value={value}>
            {children}
        </ReportesContext.Provider>
    );
}
export function useReportes() {
    const context = useContext(ReportesContext);
    if (context === undefined) throw new Error("useReportes debe usarse dentro de ReportesProvider");
    return context;
}  
