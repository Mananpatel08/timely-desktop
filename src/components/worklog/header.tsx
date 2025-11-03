import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Header } from "../ui/header/header";
import { WorkLogModal } from "./modal";
import { useState } from "react";


export const WorklogHeader = (() => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Header className="py-3 px-6 border-b ">
                <Header.LeftItem>
                    <h1 className="text-lg font-medium">Worklog</h1>
                </Header.LeftItem>
                <Header.RightItem>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => { setIsOpen(true) }}
                        className="items-center gap-1"
                    >
                        <span className="hidden sm:inline-block">Add Worklog</span>
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => { navigate("/"); }}
                        className="items-center gap-1"
                    >
                        <span className="hidden sm:inline-block">Logout</span>
                    </Button>
                </Header.RightItem>
            </Header>
            {isOpen && (<WorkLogModal
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
            />)}
        </>
    );
});
