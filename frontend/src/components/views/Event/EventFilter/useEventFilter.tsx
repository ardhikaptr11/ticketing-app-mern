import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

const filterEventSchema = yup.object().shape({
    category: yup.string(),
    isFeatured: yup.string(),
    isOnline: yup.string(),
});

const useEventFilter = () => {
    const {
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(filterEventSchema),
    });

    const { data: dataCategory, isSuccess: isSuccessGetCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => categoryServices.getCategories(),
    });

    return { dataCategory, control, errors, isSuccessGetCategory, setValue };
};

export default useEventFilter;
