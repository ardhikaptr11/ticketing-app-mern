import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/Admin/DetailCategory";

const AdminDetailCategoryPage = () => {
    return (
        <DashboardLayout
            title="Category"
            description="Manage information of this category."
            type="admin"
        >
            <DetailCategory />
        </DashboardLayout>
    );
};

export default AdminDetailCategoryPage;
