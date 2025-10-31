import { Button } from "../ui/button";
import { Header } from "../ui/header/header";


export const WorklogHeader = (() => {
    return (
        <Header className="py-3 px-6 border-b ">
            <Header.LeftItem>
                <h1 className="text-lg font-medium">Worklog</h1>
            </Header.LeftItem>
            <Header.RightItem>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => { }}
                    className="items-center gap-1"
                >
                    <span className="hidden sm:inline-block">Add Worklog</span>
                </Button>
            </Header.RightItem>
        </Header>
    );
});
