import { Editable } from "@chakra-ui/react/editable";
import { useEffect, useState } from "react";

interface EditableNumberProps {
    value: number;
    onChange: (value: number) => void;
    width?: string;
    align?: "left" | "right";
}

const EditableNumber = ({ value, onChange, width, align = "right" }: EditableNumberProps) => {
    const [modifiedValue, setModifiedValue] = useState("");

    useEffect(() => {
        if (!modifiedValue) return;
        const valueNum = Number(modifiedValue);

        onChange(valueNum);
        setModifiedValue("");
    }, [modifiedValue]);

    const alignClass = align == "right" ? "text-end justify-content-end" : "text-start justify-content-start";

    return (
        <Editable.Root>
            <Editable.Preview className={alignClass} width={width}>
                {value}
            </Editable.Preview>
            <Editable.Input className={alignClass} width={width} value={modifiedValue} onChange={(event) => setModifiedValue(event.target.value)} />
        </Editable.Root>
    );
};

export default EditableNumber;
