import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const useLandingPageLayoutNavbar = () => {
    const { isReady } = useRouter();
    const session = useSession();

    const getProfile = async () => {
        const { data } = await authServices.getProfile();

        return data.data;
    };

    const { data: dataProfile } = useQuery({
        queryKey: ["Profile"],
        queryFn: getProfile,
        enabled: isReady && session.status === "authenticated",
    });

    return { dataProfile };
};
export default useLandingPageLayoutNavbar;
