import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

const AdminDashboardPage = () => {
    return (
        <DashboardLayout
            title="Dashboard"
            description="This is admin dashboard"
            type="admin"
        >
            <Dashboard />
        </DashboardLayout>
    );
};

export default AdminDashboardPage;
