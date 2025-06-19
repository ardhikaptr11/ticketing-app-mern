import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard";

const MemberProfilePage = () => {
    return (
        <DashboardLayout title="Profile" description="Manage your profile and security" type="member">
            <Dashboard />
        </DashboardLayout>
    );
};

export default MemberProfilePage;
