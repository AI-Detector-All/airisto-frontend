import { DashboardRecently } from "../dasboard-recently";
import { DashboardDocuments } from "../dashboard-documents";
import { DashboardHero } from "../dashboard-hero";
import { DashboardYourPlan } from "../dashboard-yourplan";

export default function DashboardView() {
    return (
        <div className="bg-gray-100 w-full min-h-screen p-8">
            <DashboardHero />

            <DashboardRecently />

            <DashboardDocuments />

            <DashboardYourPlan />
        </div>
    )
}