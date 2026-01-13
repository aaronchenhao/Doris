# 事件数据维护指南

## 文件结构

所有事件数据都在 `data/events.ts` 文件中，按阶段组织。

## 事件类型

### 核心事件 (CORE)
- 每个阶段的前3个事件（subStage 1-3）
- 必须与资产配置相关（租房、车辆、投资等）
- 需要根据玩家的资产配置条件来选择合适的事件

### 随机事件 (RANDOM)
- 每个阶段的后2个事件（subStage 4-5）
- 突发状况，可以随机选择
- 通常与资产配置无关

## 如何添加新事件

### 1. 基本结构

```typescript
{
  id: 's1-core-1',  // 唯一ID，格式：s{阶段}-{类型}-{序号}
  title: '事件标题',
  description: '事件描述（2-3句话，黑暗现实主义风格）',
  type: 'CORE' | 'RANDOM',
  condition: {  // 可选，核心事件通常需要条件
    rentChoice: 'SHARED' | 'SOLO',  // 租房类型
    carType: 'NONE' | 'GAS' | 'EV',  // 车辆类型
    hasStocks: true,  // 是否有股票投资
    hasFunds: true,   // 是否有基金投资
    hasInsurance: true,  // 是否有保险
    hasFixedDeposit: true,  // 是否有定存
    minStage: 2,  // 最小阶段
    maxStage: 4,  // 最大阶段
  },
  choices: [
    {
      id: 'A',
      text: '选择A的描述',
      consequences: {
        cashChange: -1000,      // 金钱变化（负数表示支出）
        healthChange: -2,         // 健康变化
        mentalChange: -3,        // 心理健康变化
        moralityChange: 0,       // 道德变化
        narrativeResult: '选择后的结果描述'
      }
    },
    {
      id: 'B',
      text: '选择B的描述',
      consequences: {
        // 同样结构
      }
    }
  ]
}
```

### 2. 设计原则（必须遵守）

根据 `core.md` 的要求：

1. **没有完美选项**：两个选择都必须有代价，只能"换一种损失方式"
2. **不制造鸡汤**：保持黑暗现实主义风格
3. **不鼓励投机或赌博**：避免正面描述投机行为
4. **不出现违法行为的操作性描述**
5. **不使用现实机构、公司、金融产品、药品名称**
6. **失败不羞辱，成功不夸耀**：保持中性语调

### 3. 数值设计建议

- **cashChange**: 通常在 -5000 到 +5000 之间
- **healthChange**: 通常在 -10 到 +10 之间
- **mentalChange**: 通常在 -10 到 +10 之间
- **moralityChange**: 通常在 -5 到 +5 之间

### 4. 条件匹配规则

- 如果事件有条件限制，只有匹配条件的玩家才会遇到
- 核心事件应该根据资产配置提供不同的变体
- 例如：有车和没车的玩家应该遇到不同的事件

### 5. 添加步骤

1. 在对应阶段的数组中添加新事件
2. 确保 `id` 唯一
3. 如果是核心事件，添加合适的 `condition`
4. 确保两个选择都没有完美选项
5. 测试事件是否能正常显示和选择

## 示例：添加一个阶段1的核心事件

```typescript
// 在 STAGE_1_EVENTS 数组中添加
{
  id: 's1-core-new',
  title: '通勤的困扰',
  description: '每天挤地铁让你身心俱疲，你开始考虑是否应该买车。',
  type: 'CORE',
  condition: { carType: 'NONE' },  // 只有没车的玩家会遇到
  choices: [
    {
      id: 'A',
      text: '继续挤地铁，省钱但累',
      consequences: {
        cashChange: 0,
        healthChange: -3,
        mentalChange: -4,
        moralityChange: 0,
        narrativeResult: '你继续挤地铁，但长期的身体和精神消耗让你越来越疲惫。'
      }
    },
    {
      id: 'B',
      text: '考虑买车，但资金压力大',
      consequences: {
        cashChange: 0,
        healthChange: 2,
        mentalChange: -3,
        moralityChange: 0,
        narrativeResult: '你开始认真考虑买车，但资金压力让你焦虑不安。'
      }
    }
  ]
}
```

## 当前事件分布

- **阶段1**: 完整（3个核心 + 2个随机）
- **阶段2**: 完整（3个核心 + 2个随机）
- **阶段3**: 完整（3个核心 + 2个随机）
- **阶段4-6**: 使用通用事件池（建议后续为每个阶段添加专门的事件）

## 注意事项

1. **避免重复**：系统会记录已使用的事件ID，避免同一阶段重复出现
2. **条件冲突**：确保同一阶段有足够的事件覆盖不同的资产配置组合
3. **平衡性**：确保事件不会让游戏过于简单或过于困难
4. **代入感**：事件描述要符合22-28岁单身青年的生活场景

## 测试建议

添加新事件后，建议：
1. 测试不同资产配置下是否能正确匹配事件
2. 测试数值变化是否合理
3. 测试事件描述是否符合设计原则
