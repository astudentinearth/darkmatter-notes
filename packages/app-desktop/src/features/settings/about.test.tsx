import { DarkwriteDesktopClientInfo } from "@darkwrite/common";
import { render, screen } from "@testing-library/react";
// import { AboutCard } from "./about";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClientAPI } from "@renderer/lib/api/client";

const mockClientInfo: DarkwriteDesktopClientInfo = {
    electronVersion: "32",
    isPackaged: false,
    nodeVersion: "20",
    os: "Windows_NT",
    version: "0.2.0-alpha.1",
};

vi.spyOn(ClientAPI, "getClientInfo").mockImplementation(
    async () => mockClientInfo,
);

//TODO: Separate dependencies from about component to fix this nonsense
it.fails("should render client info", async () => {
    const { AboutCard } = await import("./about");
    const MockComponent = () => {
        const qc = new QueryClient();
        console.log(window.api.getClientInfo);
        return (
            <QueryClientProvider client={qc}>
                <AboutCard />
            </QueryClientProvider>
        );
    };
    render(<MockComponent />);
    expect(screen.getByText("32")).toBeInTheDocument();
    expect(screen.getByText("false")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("Windows_NT")).toBeInTheDocument();
    expect(screen.getByText("0.2.0-alpha.1")).toBeInTheDocument();
});
