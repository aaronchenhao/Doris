/**
 * 事件背景图片映射
 * 根据事件类型和主题返回对应的背景图片URL
 */

export const getEventBackground = (eventType: 'CORE' | 'RANDOM', title: string): string => {
  const titleLower = title.toLowerCase();
  
  // 根据事件标题关键词匹配背景
  if (titleLower.includes('租房') || titleLower.includes('合租') || titleLower.includes('独居')) {
    return 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80&auto=format';
  }
  if (titleLower.includes('地铁') || titleLower.includes('通勤') || titleLower.includes('车')) {
    return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&auto=format';
  }
  if (titleLower.includes('工作') || titleLower.includes('加班') || titleLower.includes('职场') || titleLower.includes('晋升') || titleLower.includes('裁员')) {
    return 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format';
  }
  if (titleLower.includes('股票') || titleLower.includes('基金') || titleLower.includes('投资') || titleLower.includes('理财') || titleLower.includes('市场')) {
    return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80&auto=format';
  }
  if (titleLower.includes('病') || titleLower.includes('医院') || titleLower.includes('健康') || titleLower.includes('保险')) {
    return 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=80&auto=format';
  }
  if (titleLower.includes('朋友') || titleLower.includes('家人') || titleLower.includes('婚礼') || titleLower.includes('求助')) {
    return 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80&auto=format';
  }
  if (titleLower.includes('夜晚') || titleLower.includes('孤独') || titleLower.includes('焦虑') || titleLower.includes('压力')) {
    return 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80&auto=format';
  }
  if (titleLower.includes('三年') || titleLower.includes('反思') || titleLower.includes('总结') || titleLower.includes('方向')) {
    return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format';
  }
  
  // 默认背景
  return eventType === 'CORE' 
    ? 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80&auto=format'
    : 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80&auto=format';
};
