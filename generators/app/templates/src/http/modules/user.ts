import Request from '../request'
const AuthorityCenter = {
  // 添加用户
  setSysUser(data: any) {
    return Request('post', '/authority/setSysUser', data)
  },
  // 删除用户
  deleteSysUser(data: any) {
    return Request('post', '/authority/deleteSysUser', data)
  }
}
export default AuthorityCenter
