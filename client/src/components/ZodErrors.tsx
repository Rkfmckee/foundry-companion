import { ZodIssue } from "zod";

interface ZodErrorsProps {
    errors: ZodIssue[];
}

const ZodErrors = ({ errors }: ZodErrorsProps) => {
    return (
        <>
            {errors.length > 0 && (
                <div className="fit-content-center">
                    There was a problem with the format of your character sheet:
                    <ul>
                        {errors.map((e, i) => (
                            <li key={i}>
                                {e.path}, <span className="colour-muted">{e.message}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default ZodErrors;
