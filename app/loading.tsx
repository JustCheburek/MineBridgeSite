import {MaxSize} from "@components/maxSize";
import {LoadingSvg} from "@ui/SVGS";

export default function Loading() {
    return (
        <MaxSize className="grid_center">
            <LoadingSvg size="40vh"/>
        </MaxSize>
    )
}