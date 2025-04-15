import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { App, Button, Dropdown, Popconfirm, Spin } from "antd";
import { useRef, useState } from "react";
import "@styles/components/admin/user/user.scss";
import { ApiDeleteUser, ApiGetUserPagination } from "@services/api.user";
import { DEFAULT_PAGE_SIZE } from "@utils/ValueConstant";
import UserModalInsertOrUpdate from "./user.modal";
import { formatDate } from "@utils/FormatCommon";
import ModalImportExcel from "./user.modal.excel";

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

type TActionType = "INSERT" | "UPDATE";
const handleFilterAndSort = (params: IFilterAndSort, sort: ISort, filter) => {
  let query = `?current=${params.current}&pageSize=${params.pageSize}`;
  if (params.email) {
    query += `&email=/${params.email}/i`;
  }
  if (params.fullName) {
    query += `&fullName=/${params.fullName}/i`;
  }
  if (params.startTime && params.endTime) {
    query += `&createdAt>=${params.startTime}&createdAt<=${params.endTime}`;
  }
  if (sort.createdAt) {
    if (sort.createdAt === "ascend") {
      query += `&sort=createdAt`;
    }
    if (sort.createdAt === "descend") {
      query += `&sort=-createdAt`;
    }
  } else {
    query += `&sort=-createdAt`;
  }

  return query;
};

const UserTable = () => {
  const actionRef = useRef<ActionType>();
  const [isOpenModalUpdateInsert, setIsOpenModalUpdateInsert] =
    useState<boolean>(false);
  const [modalType, setModalType] = useState<TActionType>("INSERT");
  const reloadTableUser = () => {
    actionRef.current?.reload();
  };

  const [userDetail, setUserDetail] = useState<IUserTable | null>(null);

  const { message } = App.useApp();

  const [isLoadingDel, setIsLoadingDel] = useState<boolean>(false);

  const [isOpenModalImportExc, setIsOpenModalImportExc] =
    useState<boolean>(false);

  const hanldeClickType = (v: TActionType) => {
    setIsOpenModalUpdateInsert(true);
    setModalType(v);
  };
  const handleDeleteUser = async (id: string) => {
    setIsLoadingDel(true);
    const res = await ApiDeleteUser(id);
    if (res.data && res.data?.deletedCount! > 0) {
      message.success("Deleted successfully!");
      reloadTableUser();
    } else {
      message.error(res.message);
    }
    setIsLoadingDel(false);
  };

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
          <Spin spinning={isLoadingDel} size="small">
            <div className="user-action">
              <a>
                <EditOutlined
                  onClick={() => {
                    hanldeClickType("UPDATE");
                    setUserDetail(entity);
                  }}
                  className="icon-update"
                />
              </a>
              <Popconfirm
                placement="left"
                title={"Are you sure to delete this task?"}
                description={"Delete the task"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  handleDeleteUser(entity._id);
                }}
              >
                <DeleteOutlined className="icon-delete" />
              </Popconfirm>
            </div>
          </Spin>
        );
      },
    },
  ];
  return (
    <>
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
          pageSize: DEFAULT_PAGE_SIZE,
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="User List"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              hanldeClickType("INSERT");
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
                  label: (
                    <span
                      onClick={() => {
                        setIsOpenModalImportExc(true);
                      }}
                    >
                      Import Data
                    </span>
                  ),
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
      <UserModalInsertOrUpdate
        isOpenModalUpdateInsert={isOpenModalUpdateInsert}
        setIsOpenModalUpdateInsert={setIsOpenModalUpdateInsert}
        reloadTableUser={reloadTableUser}
        modalType={modalType}
        userDetail={userDetail!}
        setUserDetail={setUserDetail}
      />
      <ModalImportExcel
        isOpenModalImportExc={isOpenModalImportExc}
        setIsOpenModalImportExc={setIsOpenModalImportExc}
      />
    </>
  );
};

export default UserTable;
