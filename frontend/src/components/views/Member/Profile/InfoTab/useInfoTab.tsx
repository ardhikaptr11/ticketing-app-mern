import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateProfileInfo = yup.object().shape({
    fullName: yup.string().required("Your full name is required"),
});

const useInfoTab = () => {
    const {
        control: controlUpdateProfileInfo,
        handleSubmit: handleSubmitUpdateProfileInfo,
        formState: { errors: errorsUpdateProfileInfo },
        reset: resetUpdateProfileInfo,
        setValue: setValueUpdateProfileInfo,
    } = useForm({
        resolver: yupResolver(schemaUpdateProfileInfo),
    });

    return {
        controlUpdateProfileInfo,
        errorsUpdateProfileInfo,
        handleSubmitUpdateProfileInfo,
        resetUpdateProfileInfo,
        setValueUpdateProfileInfo,
    };
};

export default useInfoTab;
