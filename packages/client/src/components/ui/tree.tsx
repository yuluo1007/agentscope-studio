import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface TreeNode {
    key: string;
    title: string | React.ReactNode; 
    children?: TreeNode[];
}

interface TreeItemProps {
    node: TreeNode;
    level: number;
    isLast: boolean;
    parentLines: boolean[];
    onToggle?: (node: TreeNode) => void;
    expandedNodes: Set<string>;
}

const TreeItem: React.FC<TreeItemProps> = ({
    node,
    level,
    isLast,
    parentLines,
    onToggle,
    expandedNodes,
}) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.key);
    const nodeRef = useRef<HTMLDivElement>(null);
    const [nodeHeight, setNodeHeight] = useState(24);

    const handleToggle = () => {
        if (onToggle) {
            onToggle(node);
        }
    };

    useEffect(() => {
        if (nodeRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    setNodeHeight(entry.contentRect.height);
                }
            });
            resizeObserver.observe(nodeRef.current);
            return () => {
                resizeObserver.disconnect();
            };
        }
    }, []);

    const renderConnectorLines = () => {
        const lines = [];
        const nodeCenterY = nodeHeight / 2;
        for (let i = 0; i < level; i++) {
            if (parentLines[i]) {
                lines.push(
                    <div
                        key={`vertical-${i}`}
                        className="absolute w-px"
                        style={{
                            left: `${i * 24 + 12}px`,
                            top: 0,
                            bottom: 0,
                            backgroundColor: 'var(--hint-color)',
                            zIndex: 2,
                        }}
                    />,
                );
            }
        }
        if (level > 0) {
            lines.push(
                <div
                    key="current-vertical"
                    className="absolute w-px"
                    style={{
                        left: `${(level - 1) * 24 + 12}px`,
                        top: 0,
                        height: isLast ? `${nodeCenterY}px` : '100%',
                        backgroundColor: 'var(--hint-color)',
                        zIndex: 2,
                    }}
                />,
            );
            lines.push(
                <svg
                    key="horizontal-curve"
                    className="absolute"
                    style={{
                        left: `${(level - 1) * 24 + 12}px`,
                        top: nodeCenterY - 4,
                        width: '20px',
                        height: '16px',
                    }}
                    viewBox="0 0 20 16"
                >
                    <path
                        d="M 0 0 Q 0 8 8 8 L 20 8"
                        fill="none"
                        stroke="var(--hint-color)"
                        strokeWidth="1"
                    />
                </svg>,
            );
        }

        return lines;
    };

    return (
        <div className="relative">
            {renderConnectorLines()}
            <div
                ref={nodeRef}
                className={cn(
                    'flex items-center py-1 px-2 hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer transition-colors',
                )}
                style={{ paddingLeft: `${level * 24 + 8}px` }}
                onClick={handleToggle}
            >
                <span className="flex items-center justify-center text-sm select-none">
                    <div className="w-4 h-4 mr-2" style={{ backgroundColor: 'var(--hint-color)' }}></div>
                    {typeof node.title === 'string' ? (
                        <span>{node.title}</span>
                    ) : (
                        <div>{node.title}</div>
                    )}
                </span>
            </div>
            {hasChildren && isExpanded && (
                <div>
                    {node.children!.map((child, index) => {
                        const isChildLast = index === node.children!.length - 1;
                        const newParentLines = [...parentLines];
                        if (level >= 0) {
                            newParentLines[level] = !isLast;
                        }

                        return (
                            <TreeItem
                                key={child.key}
                                node={child}
                                level={level + 1}
                                isLast={isChildLast}
                                parentLines={newParentLines}
                                onToggle={onToggle}
                                expandedNodes={expandedNodes}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

interface TreeProps {
    data: TreeNode[];
    className?: string;
    defaultExpandedNodes?: string[];
    defaultExpandAll?: boolean;
    onClick: (node: TreeNode) => void;
}

export const Tree: React.FC<TreeProps> = ({
    data,
    className,
    defaultExpandedNodes = [],
    defaultExpandAll = false,
    onClick,
}) => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(defaultExpandedNodes));
    useEffect(() => {
        if (defaultExpandAll) {
            const allNodeIds = new Set<string>();
            
            const collectNodeIds = (nodes: TreeNode[]) => {
                nodes.forEach(node => {
                    if (node.children && node.children.length > 0) {
                        allNodeIds.add(node.key);
                        collectNodeIds(node.children);
                    }
                });
            };
            
            collectNodeIds(data);
            setExpandedNodes(allNodeIds);
        }
    }, [data, defaultExpandAll]);

    const handleToggle = (node: TreeNode) => {
        const { key } = node;
        const newExpanded = new Set(expandedNodes);
        if (newExpanded.has(key)) {
            newExpanded.delete(key);
        } else {
            newExpanded.add(key);
        }
        setExpandedNodes(newExpanded);
        onClick(node);
    };

    return (
        <div className={className}>
            {data.map((node, index) => (
                <TreeItem
                    key={node.key}
                    node={node}
                    level={0}
                    isLast={index === data.length - 1}
                    parentLines={[]}
                    onToggle={handleToggle}
                    expandedNodes={expandedNodes}
                />
            ))}
        </div>
    );
};