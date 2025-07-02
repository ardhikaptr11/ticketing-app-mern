import { ToasterContext } from "@/contexts/ToasterContext";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailCategory = () => {
    const { query, isReady } = useRouter();
    const { setToaster } = useContext(ToasterContext);

    const getQueryById = async (id: string) => {
        const { data } = await categoryServices.getCategoryById(id);
        return data.data;
    };

    const { data: dataCategory, refetch: refetchCategory } = useQuery({
        queryKey: ["Category"],
        queryFn: () => getQueryById(`${query.id}`),
        enabled: isReady,
    });

    const updateCategory = async (payload: ICategory) => {
        const { data } = await categoryServices.updateCategory(
            `${query.id}`,
            payload,
        );
        return data.data;
    };

    const {
        mutate: mutateUpdateCategoryInfo,
        isPending: isPendingMutateUpdateCategoryInfo,
        isSuccess: isSuccessMutateUpdateCategoryInfo,
    } = useMutation({
        mutationFn: (payload: ICategory) => updateCategory(payload),
        onError: (error: AxiosError<{ meta: { message: string } }>) => {
            const message = error.response!.data.meta.message;

            setToaster({
                type: "error",
                message,
            });
        },
        onSuccess: () => {
            refetchCategory();
            setToaster({
                type: "success",
                message: "Category successfully updated",
            });
        },
    });

    const handleUpdateCategoryInfo = async (data: ICategory) => {
        const inputToCompare = ["name", "description"] as const;

        const dataFromDb = await getQueryById(`${query.id}`);

        const isEqual = inputToCompare.every(
            (item) => data[item] === dataFromDb[item],
        );

        if (isEqual)
            return setToaster({
                type: "error",
                message: "At least one field must be changed",
            });

        mutateUpdateCategoryInfo(data);
    };

    return {
        dataCategory,
        handleUpdateCategoryInfo,
        isPendingMutateUpdateCategoryInfo,
        isSuccessMutateUpdateCategoryInfo,
    };
};

export default useDetailCategory;
