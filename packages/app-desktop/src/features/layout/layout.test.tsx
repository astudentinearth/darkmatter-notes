import { expect, it } from "vitest";
import { screen, render, fireEvent, act } from "@testing-library/react";
import { Layout } from "./layout";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function RoutedLayout() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<p>Homepage</p>}></Route>
                        <Route path="page" element={<p>Editor</p>}></Route>
                        <Route
                            path="settings"
                            element={<p>Settings</p>}
                        ></Route>
                    </Route>
                </Routes>
            </MemoryRouter>
        </QueryClientProvider>
    );
}

it("should hide the sidebar and show expand button", () => {
    render(<RoutedLayout></RoutedLayout>);
    const hideSidebarButton = screen.getByTestId("button-collapse-sidebar");
    const sidebar = screen.getByTestId("container-sidebar");
    const resizeHandle = screen.getByTestId("sidebar-resize-handle");
    const expandButton = screen.getByTestId("button-expand-sidebar");
    act(() => {
        fireEvent.click(hideSidebarButton);
    });
    expect(sidebar).toHaveClass("hidden");
    expect(resizeHandle).toHaveClass("hidden");
    expect(expandButton).not.toHaveClass("hidden");
});
