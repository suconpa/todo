// useDataFilter.ts
import { useState } from "react";

const useDataFilter = (initialData: TodoList) => {
  const [filteredData, setFilteredData] = useState(initialData);

  const filterData = (data: TodoList, value: string, setFilterView: React.Dispatch<React.SetStateAction<{ value: string, status: boolean }>>) => {
    let result;

    const newDic = {
      value: value,
      status: false
    }

    if (value === "all") {
      result = data;
      newDic.status = false;
      setFilterView(newDic)
    } else if (value === "!done") {
      result = data.filter((val) => !val.done);
      newDic.status = true;
      setFilterView(newDic)
    } else if (value === "done") {
      result = data.filter((val) => val.done);
      newDic.status = true;
      setFilterView(newDic)
    } else if (value === "important") {
      result = data.filter((val) => val.important);
      newDic.status = true;
      setFilterView(newDic)
    }

    setFilteredData(result!);
  };

  return { filteredData, filterData };
};

export default useDataFilter;
