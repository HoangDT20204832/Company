'use client';

import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Tree from '@/components/tree/tree';
import permissionService from '@/services/permission/permission.service';

const TabTree = () => {
  const { data: getAllPermissionsRes } = useQuery({
    queryKey: ['getAllPermissions'],
    queryFn: () => permissionService.getAllPermissions(),
  });
  const allPermissions = getAllPermissionsRes?.items || [];

  const [treeValue, setTreeValue] = useState<string[]>([]);

  return (
    <Box>
      <div>Đã chọn: {JSON.stringify(treeValue)}</div>
      <Tree
        treeData={allPermissions.map((p) => ({
          label: p.displayName,
          value: p.name,
          parentName: p.parentName,
          name: p.name,
        }))}
        treeDataSimpleMode={{ id: 'name', pId: 'parentName' }}
        value={treeValue}
        onChange={(v) => setTreeValue(v || [])}
      />
    </Box>
  );
};

export default TabTree;
