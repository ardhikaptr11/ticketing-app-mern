import { Button, Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import { Fragment } from "react";

interface PropTypes {
    description: string;
}

const DescriptionTab = (props: PropTypes) => {
    const { description } = props;

    return (
        <Fragment>
            <h1 className="mb-2 text-xl font-semibold text-gray-700">
                Description
            </h1>
            <Skeleton
                className="min-h-[200px] w-full rounded-lg"
                isLoaded={!!description}
            >
                <Card className="min-h-[200px] w-full">
                    <CardBody>
                        <p>{description}</p>
                    </CardBody>
                </Card>
            </Skeleton>
        </Fragment>
    );
};

export default DescriptionTab;
