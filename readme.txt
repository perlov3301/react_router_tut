git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/perlov3301/react_router_tut.git
git push -u origin main

echo "  " >> readme.txt
dir F: /a:h /b /s   F driver (C or D) /a:h displays the name of dir and files with Hidden attr
                    /b display a bare list   /s list every occurence within dir and subdir
attrib -h -r -s /s /d F:\*.*  -h=>clears Hidden file attr; -r read-only attr -s System file attr
                              /s  applies attr and any command options to files /d to directories

                              import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
*** pick the  router***
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
***spinner
 background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15M4 20v-5h.581m0 0a8.003 8.003 0 0015.357-2M4.581 15H9' /%3E%3C/svg%3E");

 file '/file1.mp4'
 file '/file2.mp4'
 $ffmpeg -safe 0 -f concat -i mylist.txt -c copy new.mp4
 