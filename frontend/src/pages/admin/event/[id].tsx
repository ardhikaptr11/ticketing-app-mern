import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/Admin/DetailEvent";

const AdminDetailEventPage = () => {
    return (
        <DashboardLayout
            title="Event"
            description="Manage information of this event."
            type="admin"
        >
            <DetailEvent />
        </DashboardLayout>
    );
};

export default AdminDetailEventPage;
