import React from 'react'
import { CommandBar } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

export default function ToolBar() {
    const navigate = useNavigate();
    return (
        <div>
            <CommandBar
                items={[
                    {
                        key: "add",
                        text: "Create",
                        iconProps: { iconName: "Add" },
                        onClick: () => {
                            navigate("/book/create")
                        }
                    }
                ]}
                style={{paddingTop:50 }}
            />
            <hr style={{ border: "1px solid #feee", margin: 0 }} />
        </div>
    )
}
