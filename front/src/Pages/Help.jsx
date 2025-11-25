// import React, { useState, useEffect } from "react";

// export default function SearchBox() {
//   const [query, setQuery] = useState("");
//   const [debouncedQuery, setDebouncedQuery] = useState(query);

//   // Debounce logic
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(query);
//     }, 500); // 500ms delay

//     return () => {
//       clearTimeout(handler); // cleanup on next keystroke
//     };
//   }, [query]);

//   // Trigger search only when debouncedQuery updates
//   useEffect(() => {
//     if (debouncedQuery) {
//       console.log("Searching for:", debouncedQuery);
//     }
//   }, [debouncedQuery]);

//   return (
//     <input
//       type="text"
//       placeholder="Search..."
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//     />
//   );
// }




import React, { use, useState,useEffect } from "react";
import SelectAllGroup from "./SelectAllGroup";

export default function MyPage() {
  const fields = [
    "createListInAdminMyActivities",
    "organizationInAdminMyActivities",
    "createUsersInAdminMyActivities",
    "modifyListInAdminMyActivities",
    "modifyUsersInAdminMyActivities",
    "designationInAdminMyActivities",
    "departmentInAdminMyActivities",
    "holiDaysInAdminMyActivities",
    "terminateUsersInAdminMyActivities",
    "lockedEmpAccInAdminMyActivities",
  ];

  const [MyActivities, setMyActivities] = useState([]);


  useEffect(() => {
    console.log(MyActivities);
    const payload = {
      createListInAdminMyActivities: MyActivities.includes("createListInAdminMyActivities")?true:false,
      hidden : "createListInAdminMyActivities",
    }
    console.log(payload);
  },[MyActivities])

  return (
    <div>
      <SelectAllGroup
        items={fields}
        selected={MyActivities}
        onChange={setMyActivities}
      />
    </div>
  );
}

