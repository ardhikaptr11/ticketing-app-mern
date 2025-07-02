import { ReactNode } from "react";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

const iconList: { [key: string]: ReactNode } = {
    success: <FaRegCircleCheck className="text-3xl text-success-500" />,
    error: <FaRegCircleXmark className="text-3xl text-danger-500" />,
};

interface PropTypes {
    type: string;
    message: string;
}

const Toaster = (props: PropTypes) => {
    const { type, message } = props;

    return (
        <div
            role="alert"
            aria-labelledby="toaster-label"
            className="fixed right-8 top-8 z-50 max-w-xs rounded-xl border-gray-400 bg-white shadow-md"
        >
            <div className="flex items-center gap-2 p-4">
                {iconList[type]}
                <p
                    id="toaster-label"
                    className={`text-sm ${type === "success" ? "text-success-500" : "text-danger-500"}`}
                >
                    {message}
                </p>
            </div>
        </div>
    );
};

export default Toaster;
