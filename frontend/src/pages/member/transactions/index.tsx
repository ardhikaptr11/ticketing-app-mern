import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transactions from "@/components/views/Member/Transactions";

const MemberTransactionsPage = () => {
    return (
        <DashboardLayout
            title="Transactions"
            description="List of all transactions"
            type="member"
        >
            <Transactions />
        </DashboardLayout>
    );
};

export default MemberTransactionsPage;
