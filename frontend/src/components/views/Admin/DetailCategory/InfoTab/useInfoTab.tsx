import { yupResolver } from "@hookform/resolvers/yup";
import { initialize } from "next/dist/server/lib/render-server";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateCategoryInfo = (
    initialName: string,
    initialDescription: string,
) =>
    yup.object().shape({
        name: yup
            .string()
            .required("Category name is required")
            .test(
                "must-be-different",
                "Name must be different",
                (value) =>
                    value?.trim().toLowerCase() !==
                    initialName.trim().toLowerCase(),
            ),
        description: yup
            .string()
            .required("Category description is required")
            .test(
                "must-be-different",
                "Description must be different",
                (value) =>
                    value?.trim().toLowerCase() !==
                    initialDescription.trim().toLowerCase(),
            ),
    });

const useInfoTab = (initialName: string, initialDescription: string) => {
    const {
        control: controlUpdateCategoryInfo,
        handleSubmit: handleSubmitUpdateCategoryInfo,
        formState: { errors: errorsUpdateCategoryInfo },
        reset: resetUpdateCategoryInfo,
        setValue: setValueUpdateCategoryInfo,
    } = useForm({
        resolver: yupResolver(schemaUpdateCategoryInfo(initialName, initialDescription)),
    });

    return {
        controlUpdateCategoryInfo,
        errorsUpdateCategoryInfo,
        handleSubmitUpdateCategoryInfo,
        resetUpdateCategoryInfo,
        setValueUpdateCategoryInfo,
    };
};

export default useInfoTab;
