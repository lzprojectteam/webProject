export default {
    sex: [
        { key: 0, value: '男' },
        { key: 1, value: '女' },
        { key: 2, value: '保密' }
    ],
    boolean: [{ key: true, value: '是' }, { key: false, value: '否' }],
    controlList: [
        { key: 1, value: '编制' },
        { key: 5, value: '启用' },
        { key: 9, value: '停用' }
    ],
    tfarm: {
        distributeStatusList: [
            { key: 1, value: '未下发' },
            { key: 3, value: '正在下发' },
            { key: 5, value: '已下发' },
            { key: 9, value: '下发失败' }
        ],
        controlList: [
            { key: 1, value: '编制' },
            { key: 5, value: '启用' },
            { key: 9, value: '停用' }
        ]
    }
};
