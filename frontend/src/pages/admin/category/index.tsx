import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";

const AdminCategoryPage = () => {
    return (
        <DashboardLayout
            title="Category"
            description="List of all categories, create new and manage existing categories"
            type="admin"
        >
            <Category />
        </DashboardLayout>
    );
};

export default AdminCategoryPage;
