import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Member/Profile";

const MemberProfilePage = () => {
    return (
        <DashboardLayout title="Profile" description="Manage your profile and security" type="member">
            <Profile />
        </DashboardLayout>
    );
};

export default MemberProfilePage;
