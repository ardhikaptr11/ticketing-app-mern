import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import eventServices from "@/services/event.service";
import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

const useDeleteEventModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteEventAndFile = async ({
        id,
        banner,
    }: {
        id: string;
        banner: string;
    }) => {
        await eventServices.deleteEvent(id);
        await uploadServices.deleteFile({ fileURL: banner });
    };

    const {
        mutate: mutateDeleteEvent,
        isPending: isPendingMutateDeleteEvent,
        isSuccess: isSuccessMutateDeleteEvent,
    } = useMutation({
        mutationFn: deleteEventAndFile,
        onError: (error: AxiosError<{ meta: { message: string } }>) => {
            const message = error.response!.data.meta.message;
            setToaster({
                type: "error",
                message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Event successfully deleted",
            });
        },
    });

    return {
        mutateDeleteEvent,
        isPendingMutateDeleteEvent,
        isSuccessMutateDeleteEvent,
    };
};

export default useDeleteEventModal;
