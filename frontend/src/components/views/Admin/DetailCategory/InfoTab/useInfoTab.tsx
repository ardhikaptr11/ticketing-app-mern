import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateCategoryInfo = yup.object().shape({
    name: yup.string().required("Category name is required"),
    description: yup.string().required("Category description is required"),
});

const useInfoTab = () => {
    const {
        control: controlUpdateCategoryInfo,
        handleSubmit: handleSubmitUpdateCategoryInfo,
        formState: { errors: errorsUpdateCategoryInfo },
        reset: resetUpdateCategoryInfo,
        setValue: setValueUpdateCategoryInfo,
    } = useForm({
        resolver: yupResolver(schemaUpdateCategoryInfo),
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
