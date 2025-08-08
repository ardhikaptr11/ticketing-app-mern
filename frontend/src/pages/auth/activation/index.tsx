import AuthLayout from "@/components/layouts/AuthLayout";
import Activation from "@/components/views/Auth/Activation";
import authServices from "@/services/auth.service";

interface PropTypes {
    status: "success" | "failed";
}

const ActivationPage = (props: PropTypes) => {
    return (
        <AuthLayout
            title={`Zentix | Activation ${props.status.charAt(0).toUpperCase() + props.status.slice(1)}`}
        >
            <Activation {...props} />
        </AuthLayout>
    );
};

export async function getServerSideProps(context: { query: { code: string } }) {
    try {
        const result = await authServices.activation({
            code: context.query.code,
        });

        if (result.data.data) {
            return {
                props: {
                    status: "success",
                },
            };
        } else {
            return {
                props: {
                    status: "failed",
                },
            };
        }
    } catch (error) {
        return {
            props: {
                status: "failed",
            },
        };
    }
}

export default ActivationPage;
