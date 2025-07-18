import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailBanner from "@/components/views/Admin/DetailBanner";

const AdminDetailBannerPage = () => {
    return (
        <DashboardLayout
            title="Banner"
            description="Manage information of this banner."
            type="admin"
        >
            <DetailBanner />
        </DashboardLayout>
    );
};

export default AdminDetailBannerPage;
