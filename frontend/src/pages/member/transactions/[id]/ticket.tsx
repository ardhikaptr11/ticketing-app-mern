import PageHead from "@/components/commons/PageHead";
import Ticket from "@/components/ui/Ticket";

const TicketDisplayPage = () => {
    return (
        <section className="flex min-h-screen items-center justify-center bg-[#f0f0f0] lg:py-5">
            <PageHead title="Zentix | Ticket" />
            <Ticket />
        </section>
    );
};

export default TicketDisplayPage;
