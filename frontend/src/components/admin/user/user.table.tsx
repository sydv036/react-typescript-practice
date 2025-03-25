import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Dropdown, Popconfirm } from "antd";
import { useRef } from "react";
import "@styles/components/admin/user/user.scss";
import { ApiGetUserPagination } from "@services/api.user";
import { DEFAULT_PAGE_SIZE } from "@utils/ValueConstant";

interface IFilterAndSort {
  current: number;
  pageSize: number;
  email: string;
  fullName: string;
  startTime: string;
  endTime: string;
}
type TSorted = "ascend" | "descend";
interface ISort {
  createdAt: TSorted;
}

const columns: ProColumns<IUserTable>[] = [
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

    formItemProps: {
      rules: [
        {
          required: true,
          message: "此项为必填项",
        },
      ],
    },
    render(dom, entity, index, action, schema) {
      return <a>{entity._id}</a>;
    },
  },
  {
    disable: true,
    title: "Email",
    dataIndex: "email",
    filters: true,
    onFilter: true,
    copyable: true,
    ellipsis: true,
    valueType: "text",
  },
  {
    disable: true,
    title: "Full Name",
    dataIndex: "fullName",
    search: true,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
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
    dataIndex: "created_at",
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
        <div className="user-action">
          <a>
            <EditOutlined className="icon-update" />
          </a>
          <Popconfirm
            placement="left"
            title={"Are you sure to delete this task?"}
            description={"Delete the task"}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              alert(`Okay ${entity._id}`);
            }}
          >
            <DeleteOutlined className="icon-delete" />
          </Popconfirm>
        </div>
      );
    },
  },
];
const handleFilterAndSort = (params, sort, filter) => {
  let query = `?current=${params.current}&pageSize=${params.pageSize}`;
  if (params.email) {
    query += `&email=/${params.email}/i`;
  }
  if (params.fullName) {
    query += `&fullName=/${params.fullName}/i`;
  }
  if (sort.createdAt) {
    if (sort.createdAt === "ascend") {
      query += `&sort=-createdAt`;
    }
    if (sort.createdAt === "descend") {
      query += `&sort=createdAt`;
    }
  } else {
    query += `$sort=-createAt`;
  }
  console.log("check query:", query);

  return query;
};

const UserTable = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<IUserTable>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params: IFilterAndSort, sort: ISort, filter) => {
        console.log({ params, sort, filter });

        const res = await ApiGetUserPagination(
          handleFilterAndSort(params, sort, filter)
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
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: DEFAULT_PAGE_SIZE,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="User List"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
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
                label: "Import Data",
                key: "1",
              },
              {
                label: "Export Data",
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
  );
};

export default UserTable;
