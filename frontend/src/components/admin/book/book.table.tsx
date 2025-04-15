import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import {
  ApiDeleteBook,
  ApiGetBookPagination,
  ApiGetCategory,
} from "@services/api.book";
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_DURATION_COUNTUP,
  DEFAULT_PAGE_SIZE,
  SHOW_PROGRESS,
} from "@utils/ValueConstant";
import { App, Button, Dropdown, Popconfirm, Space, Tag } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BookModalInsertOrUpdate from "./book.modal";
import { formatDate, formatPrice } from "@utils/FormatCommon";

interface IFillterBook {
  author: string;
  category: string;
  current: number;
  pageSize: number;
  startTime: string;
  endTime: string;
}
interface ISort {
  createdAt: "ascend" | "descend";
}
type THandle = "INSERT" | "UPDATE";
const BookTable = () => {
  const actionRef = useRef<ActionType>();

  const [category, setCategory] = useState<{ label: string; value: string }[]>(
    []
  );
  const [isOpenModalInsertOrUpdate, setsOpenModalInsertOrUpdate] =
    useState<boolean>(false);
  const [typeHandle, setTypeHandle] = useState<THandle>("INSERT");
  const [bookDetail, setBookDetail] = useState<IBookTable | null>(null);
  const { message, notification } = App.useApp();

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

  const deleteBook = async (id: string) => {
    const res = await ApiDeleteBook(id);
    if (res.data) {
      message.success("Delete a book success!");
      reloadTable();
    } else {
      notification.error({
        message: `Deleted book id ${id} failed`,
        description: res.message,
        duration: DEFAULT_DURATION_COUNTUP,
        showProgress: SHOW_PROGRESS,
      });
    }
  };

  const handleFilterAndSort = (params: IFillterBook, sort: ISort) => {
    let query = `current=${params.current}&pageSize=${params.pageSize}`;
    if (params.author) {
      query += `&author=/${params.author}/i`;
    }
    if (params.category) {
      query += `&category=${params.category}`;
    }
    if (params.startTime && params.endTime) {
      query += `&createdAt>=${params.startTime}&createdAt<=${params.endTime}`;
    }
    let sortQr = `&sort=-createdAt`;
    if (sort.createdAt) {
      if (sort.createdAt === "ascend") {
        sortQr = `&sort=createdAt`;
      } else {
        sortQr = `&sort=-createdAt`;
      }
    } else {
      query += sortQr;
    }
    return query;
  };

  const columns: ProColumns<IBookTable>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "ID",
      dataIndex: "_id",
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
      title: "Price",
      dataIndex: "price",
      filters: true,
      onFilter: true,
      ellipsis: true,
      render(dom, entity, index, action, schema) {
        return <>{formatPrice("vi-VN", entity.price)}</>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      filters: true,
      onFilter: true,
      ellipsis: true,
    },
    {
      title: "Create At",
      key: "showTime",
      dataIndex: "createdAt",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return <>{formatDate(entity.createdAt, "DD/MM/YYYY")}</>;
      },
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <EditOutlined
              style={{ color: "blue" }}
              onClick={() => {
                setTypeHandle("UPDATE");
                setsOpenModalInsertOrUpdate(true);
                setBookDetail(entity);
              }}
            />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              placement="bottomLeft"
              onConfirm={() => {
                deleteBook(entity._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Popconfirm>
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
        request={async (params: IFillterBook, sort: ISort, filter) => {
          console.log({ params, sort, filter });
          const res = await ApiGetBookPagination(
            handleFilterAndSort(params, sort)
          );
          return {
            data: res.data?.result,
            total: res.data?.meta.total,
            success: true,
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
          // onChange(value) {
          //   console.log("value: ", value);
          // },
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
          defaultCurrent: DEFAULT_CURRENT_PAGE,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50", "100"],
        }}
        dateFormatter="string"
        headerTitle="Book List"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setsOpenModalInsertOrUpdate(true);
              setTypeHandle("INSERT");
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
        typeHandle={typeHandle}
        setBookDetail={setBookDetail}
        bookDetail={bookDetail!}
      />
    </>
  );
};
export default BookTable;
