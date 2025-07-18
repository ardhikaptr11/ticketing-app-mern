import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateBannerInfo = yup.object().shape({
    title: yup.string().required("Title is required"),
    isShow: yup.string().required("Please select one of the options"),
});

const useInfoTab = () => {
    const {
        control: controlUpdateBannerInfo,
        handleSubmit: handleSubmitUpdateBannerInfo,
        formState: { errors: errorsUpdateBannerInfo },
        reset: resetUpdateBannerInfo,
        setValue: setValueUpdateBannerInfo,
    } = useForm({
        resolver: yupResolver(schemaUpdateBannerInfo),
    });

    return {
        controlUpdateBannerInfo,
        errorsUpdateBannerInfo,
        handleSubmitUpdateBannerInfo,
        resetUpdateBannerInfo,
        setValueUpdateBannerInfo,
    };
};

export default useInfoTab;
