import { useEffect, useState, useMemo } from "react";
import { getUsers } from "./Helpers/ApiManager";
import { Users, pagination } from "./Types/user";
import { userColumnsDef, generateTableData } from "./Helpers/Columns";
import TanstackTable from "./Components/TanstackTable/TanstackTable";
import "./App.css";

function App() {
  const [info, setInfo] = useState<pagination>({
    pageIndex: 1,
    pageSize: 10,
  });

  const [users, setUsers] = useState<Users>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getUsers(info.pageIndex, info.pageSize)
        .then((res) => {
          return setUsers(res.results);
        })
        .catch((err) => console.log({ err }))
        .finally(() => setLoading(false));
    })();
  }, [info]);

  const userData = useMemo(() => generateTableData(users), [users]);
  const userTableColumns = useMemo(() => userColumnsDef, []);

  return (
    <div>
      <TanstackTable
        columns={userTableColumns}
        data={userData}
        paginationObj={{ pageIdx: info.pageIndex, pageSize: info.pageSize }}
        setPagination={setInfo}
        loading={loading}
      />
    </div>
  );
}

export default App;
