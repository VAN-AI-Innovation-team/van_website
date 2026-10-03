// Each future admin feature gets its own route and src/features/<id>/ directory.
// Planned entries remain labels until the feature and its API are implemented.
export const ADMIN_MODULES = [
  { id: 'content', label: '콘텐츠 편집', icon: '▤', path: '/admin/', status: 'ready' },
  { id: 'members', label: '회원', icon: '♙', path: '/admin/members/', status: 'planned' },
  { id: 'notifications', label: '알림', icon: '◉', path: '/admin/notifications/', status: 'planned' },
  { id: 'ai', label: 'AI', icon: '✦', path: '/admin/ai/', status: 'planned' },
  { id: 'partners', label: '협력기관', icon: '◇', path: '/admin/partners/', status: 'planned' },
]
