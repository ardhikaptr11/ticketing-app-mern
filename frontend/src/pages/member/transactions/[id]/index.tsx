import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/DetailTransaction";

const MemberDetailTransactionPage = () => {
    return (
        <DashboardLayout
            title="Detail Transaction"
            description="Information for specific transaction"
            type="member"
        >
            <DetailTransaction />
        </DashboardLayout>
    );
};

export default MemberDetailTransactionPage;
