
import { useApplications } from "@/context/ApplicationContext";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RecentApplications from "@/components/dashboard/RecentApplications";

export default function Dashboard() {
  const { applications } = useApplications();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome to License Manager</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            Get started by adding your first application to begin tracking software licenses.
          </p>
          <a href="/applications" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
            Add Your First Application
          </a>
        </div>
      ) : (
        <>
          <DashboardStats />
          <DashboardCharts />
          <RecentApplications />
        </>
      )}
    </div>
  );
}
