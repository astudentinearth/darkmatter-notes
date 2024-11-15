import { Layout } from "@renderer/features/layout";
import { useSettingsStore } from "./context/settings-store";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./features/home";
import { EditorRoot } from "./features/editor";
import { SettingsPage } from "./features/settings";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useNoteFromURL } from "./hooks/use-note-from-url";

const EditorRootWrapper = () => {
    const note = useNoteFromURL();
    if (!note) return "Not found";
    return <EditorRoot key={`editor-root-${note}`} />;
};

function App() {
    const store = useSettingsStore();
    const [queryClient] = useState(() => new QueryClient());
    useEffect(() => {
        window.api.settings.load().then((prefs) => {
            if (prefs == null) throw new Error("Could not load user settings");
            else store.overwrite(prefs);
        });
    }, []);

    return (
        <div className="w-full h-full overflow-hidden">
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />}></Route>
                            <Route
                                path="/page/:pageId"
                                loader={({ params }) => {
                                    console.log(params.pageId);
                                    return null; // Return a value of type DataFunctionReturnValue
                                }}
                                element={<EditorRootWrapper />}
                            ></Route>
                            <Route
                                path="settings"
                                element={<SettingsPage />}
                            ></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    );
}

export default App;
