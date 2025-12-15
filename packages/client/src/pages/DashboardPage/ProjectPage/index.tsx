import { Key, memo, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableColumnsType } from 'antd';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

import AsTable from '@/components/tables/AsTable';
import DeleteIcon from '@/assets/svgs/delete.svg?react';
import PageTitleSpan from '@/components/spans/PageTitleSpan.tsx';

import { useProjectListRoom } from '@/context/ProjectListRoomContext.tsx';
import { SecondaryButton } from '@/components/buttons/ASButton';
import {
    NumberCell,
    renderTitle,
    TextCell,
} from '@/components/tables/utils.tsx';

interface DataType {
    project: string;
    running: number;
    pending: number;
    finished: number;
    total: number;
    createdAt: string;
}

const ProjectPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { projects, deleteProjects } = useProjectListRoom();

    const [searchText, setSearchText] = useState<string>('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    useEffect(() => {
        const existedProjects = projects.map((proj) => proj.project);
        setSelectedRowKeys((prevRowKeys) =>
            prevRowKeys.filter((project) =>
                existedProjects.includes(project as string),
            ),
        );
    }, [projects]);

    const columns: TableColumnsType<DataType> = [
        {
            title: renderTitle(t('common.project'), 14),
            key: 'project',
            width: '40%',
            defaultSortOrder: undefined,
            render: (value, record) => (
                <TextCell
                    text={value}
                    selected={selectedRowKeys.includes(record.project)}
                />
            ),
        },
        {
            key: 'createdAt',
            defaultSortOrder: 'descend',
            width: '20%',
            render: (value, record) => (
                <TextCell
                    text={value}
                    selected={selectedRowKeys.includes(record.project)}
                />
            ),
        },
        {
            key: 'running',
            render: (value, record) => (
                <NumberCell
                    number={value}
                    selected={selectedRowKeys.includes(record.project)}
                />
            ),
        },
        {
            key: 'finished',
            render: (value, record) => (
                <NumberCell
                    number={value}
                    selected={selectedRowKeys.includes(record.project)}
                />
            ),
        },
        {
            key: 'pending',
            render: (value, record) => (
                <NumberCell
                    number={value}
                    selected={selectedRowKeys.includes(record.project)}
                />
            ),
        },
        {
            key: 'total',
            render: (value, record) => (
                <NumberCell
                    number={value}
                    selected={selectedRowKeys.includes(record.project)}
                />
            ),
        },
    ];

    return (
        <div className="flex flex-col w-full h-full p-8 gap-4">
            <PageTitleSpan title={t('common.projects')} />
            <div className="flex items-center gap-4">
                <Input
                    value={searchText}
                    onChange={(event) => {
                        setSearchText(event.target.value);
                    }}
                    className="w-full sm:w-[300px] rounded-md"
                    placeholder={t('placeholder.search-project')}
                />

                <SecondaryButton
                    tooltip={
                        selectedRowKeys.length === 0
                            ? t(
                                  'tooltip.button.delete-selected-projects-disable',
                              )
                            : t('tooltip.button.delete-selected-projects', {
                                  number: selectedRowKeys.length,
                              })
                    }
                    icon={<DeleteIcon width={13} height={13} />}
                    disabled={selectedRowKeys.length === 0}
                    variant="dashed"
                    onClick={() => {
                        deleteProjects(selectedRowKeys as string[]);
                    }}
                >
                    {t('action.delete')}
                </SecondaryButton>
            </div>

            <AsTable<DataType>
                columns={columns}
                dataSource={projects.filter((proj) =>
                    proj.project.includes(searchText),
                )}
                loading={false}
                onRow={(record: DataType) => {
                    return {
                        onClick: (event: MouseEvent) => {
                            if (event.type === 'click') {
                                navigate(`${record.project}`);
                            }
                        },
                        style: {
                            cursor: 'pointer',
                        },
                    };
                }}
                pagination={false}
                rowKey="project"
                rowSelection={rowSelection}
            />
        </div>
    );
};

export default memo(ProjectPage);
