import { DashboardDocuments } from "../dashboard-documents";
import { DashboardHero } from "../dashboard-hero";

export default function DashboardView() {
    return (
        <div className="bg-gray-100 w-full min-h-screen p-8">
            <DashboardHero />

            <DashboardDocuments />
        </div>
    )
}