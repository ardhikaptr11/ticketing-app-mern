import cn from "@/utils/cn";
import { ReactNode } from "react";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

const iconList: { [key: string]: ReactNode } = {
    success: <FaRegCircleCheck className="text-3xl text-success-500" />,
    error: <FaRegCircleXmark className="text-3xl text-danger-500" />,
};

interface PropTypes {
    type: string;
    message: string;
    isShowing: boolean;
    afterLoginSuccess: boolean;
}

const Toaster = (props: PropTypes) => {
    const { type, message, isShowing, afterLoginSuccess } = props;

    return (
        <div
            role="alert"
            aria-labelledby="toaster-label"
            className={cn(
                "fixed right-8 z-50 max-w-xs rounded-xl border-gray-400 bg-white shadow-md",
                afterLoginSuccess ? "top-[4.5rem]" : "top-8",
                isShowing ? "animate-toasterIn" : "animate-toasterOut",
            )}
        >
            <div className="flex items-center gap-2 p-4">
                {iconList[type]}
                <p
                    id="toaster-label"
                    className={cn("text-sm", {
                        "text-success-500": type === "success",
                        "text-danger-500": type === "error",
                    })}
                >
                    {message}
                </p>
            </div>
        </div>
    );
};

export default Toaster;
