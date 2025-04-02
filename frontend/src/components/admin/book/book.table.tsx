import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { ApiGetBookPagination, ApiGetCategory } from "@services/api.book";
import { DEFAULT_PAGE_SIZE } from "@utils/ValueConstant";
import { Button, Dropdown, Space, Tag } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BookModalInsertOrUpdate from "./book.modal";

const BookTable = () => {
  const actionRef = useRef<ActionType>();

  const [category, setCategory] = useState<{ label: string; value: string }[]>(
    []
  );
  const [isOpenModalInsertOrUpdate, setsOpenModalInsertOrUpdate] =
    useState<boolean>(true);

  const categoryList = async () => {
    const res = await ApiGetCategory();
    if (res.data) {
      setCategory(
        res.data.map((item) => {
          return { label: item, value: item };
        })
      );
    }
  };
  const reloadTable = () => {
    return actionRef.current?.reload();
  };

  useEffect(() => {
    categoryList();
  }, []);

  const columns: ProColumns<IBookTable>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "ID",
      dataIndex: "_id",
      copyable: true,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      disable: true,
      title: "Author",
      dataIndex: "author",
      filters: true,
      onFilter: true,
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      hideInSearch: false,
      valueType: "select",
      request: () => {
        return category;
      },
    },
    {
      title: "Create At",
      key: "showTime",
      dataIndex: "createdAt",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      valueType: "dateRange",
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: "Action",
      valueType: "option",
      key: "option",
      render(dom, entity, index, action, schema) {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <a>Delete</a>
            <a>Update</a>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <ProTable<IBookTable>
        key={"_id"}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          const res = await ApiGetBookPagination();
          return {
            data: res.data?.result,
          };
        }}
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
          onChange(value) {
            console.log("value: ", value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50", "100"],
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="Book List"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setsOpenModalInsertOrUpdate(true);
            }}
            type="primary"
          >
            Add New
          </Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: "Import Excel",
                  key: "1",
                },
                {
                  label: "Export Excel",
                  key: "2",
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <BookModalInsertOrUpdate
        isOpenModalInsertOrUpdate={isOpenModalInsertOrUpdate}
        setsOpenModalInsertOrUpdate={setsOpenModalInsertOrUpdate}
        reloadTable={reloadTable}
        category={category}
      />
    </>
  );
};
export default BookTable;
