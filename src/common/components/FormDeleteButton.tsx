import React from "react"

interface FormDeleteButtonProps {
    label: string,
    onClick: () => any
}

export default function FormDeleteButton(props: FormDeleteButtonProps) {
    return (
        <button className="btn btn-danger" onClick={props.onClick}>{props.label}</button>
    )
}
